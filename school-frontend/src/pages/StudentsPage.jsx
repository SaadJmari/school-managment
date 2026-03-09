import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useStudents from "../hooks/useStudents";
import StudentsList from "../components/StudentsList";
import PaginationControls from "../components/PaginationControls";
import StudentForm from "../components/StudentForm";
import { createStudent, updateStudent } from "../api/students";
import useDeleteStudent from "../hooks/useDeleteStudent";
import useDebounce from "../hooks/useDebounce";
import useStudentFilterOptions from "../hooks/useStudentFilterOptions";
import "./StudentsPage.css";

function StudentsPage() {

  const navigate = useNavigate();
  const limit = 10;

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const q = searchParams.get("q") || "";
  const grade = searchParams.get("grade") || "";
  const className = searchParams.get("class") || "";
  const gender = searchParams.get("gender") || "";
  const debouncedQ = useDebounce(q, 300);
  const sort = searchParams.get("sort") || "lastName";
  const order = searchParams.get("order") || "asc";
  const { students, pagination, loading, error, refetch } = useStudents({ page, limit, q: debouncedQ, grade, className, gender, sort, order });
  const { remove,  error: deleteError} = useDeleteStudent();
  const { grades, classes, genders, loading: filterLoading, error: filterError} = useStudentFilterOptions();

  function updateSearchParams(updates) {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    setSearchParams(nextParams);
  }
  
  function handleView(id) {
    navigate(`/students/${id}`);
  }

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      if(editingStudent) {
        await updateStudent(editingStudent._id, payload);
        setShowForm(false);
        setEditingStudent(null);
        refetch();
        return;
      }

      //create mode
      await createStudent(payload);

      // show the new student immediately
      setShowForm(false);

      if (page !== 1) {
        updateSearchParams({ page: 1});
      } else {
        refetch();
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Delete this student?");
    if (!ok) return;

    try {
      setDeletingId(id);
      await remove(id);

      if (students.length === 1 && page > 1) {
        updateSearchParams({ page: page - 1});
        return;
      }

      refetch();
    } catch {
      // Hook already sets deleteError
    } finally {
      setDeletingId(null)
    }
  }

  function handleToggleForm() {
    if(!showForm) {
      setEditingStudent(null);
      setShowForm(true);
      return;
    }

    setShowForm(false);
    setEditingStudent(null);
  }

  function handleSort(column) {
    const nextParams = new URLSearchParams(searchParams);

    if(column !==  sort) {
      nextParams.set("sort", column);
      nextParams.set("order", "asc");
    } else {
      nextParams.set("order", order === "asc" ? "desc" : "asc");
    }

    nextParams.set("page", "1");
    setSearchParams(nextParams);
  }


  return (
    <div className="students-page">
      <div className="students-page__header">
        <h2>Students</h2>

        <button type="button" onClick={handleToggleForm}>
          {showForm ? "Close" : "Add student"}
        </button>
      </div>

      <div className="students-page__filters">
        <input 
          type="text" 
          placeholder="Search by first or last name" 
          value={q} 
          onChange={(e) => updateSearchParams({
            q: e.target.value,
            page: 1,
          })} />
        <select
          value={grade}
          onChange={(e) =>
            updateSearchParams({
              grade: e.target.value,
              page: 1,
            })
          }
        >
          <option value="">All grades</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          value={className}
          onChange={(e) =>
            updateSearchParams({
              class: e.target.value,
              page: 1,
            })
          }
        >
          <option value="">All classes</option>
          {classes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={gender}
          onChange={(e) =>
            updateSearchParams({
              gender: e.target.value,
              page: 1,
            })
          }
        >
          <option value="">All genders</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {deleteError && <p className="students-page__error">Delete failed: {deleteError}</p>}

      {showForm && (
        <div className="students-page__form">
          <StudentForm
            initialValues={editingStudent}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingStudent(null);
            }}
            submitting={submitting}
            submitLabel={editingStudent ? "Save" : "Add"}
          />
        </div>
      )}

      <div className="students-page__list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
        <StudentsList 
            students={students}
            sort={sort}
            order={order}
            onSort={handleSort} 
            onView={handleView}
            onDelete={handleDelete} 
            onEdit={(student) => {
            setEditingStudent(student);
            setShowForm(true);
          }} 
          deletingId={deletingId}
          />
        )}
      </div>

      {pagination && (<div className="students-page__pagination">
        <PaginationControls
          pagination={pagination}
          onPrevious={() => updateSearchParams({ page: page - 1 })}
          onNext={() => updateSearchParams({ page: page + 1})}
        />
      </div>)}
    </div>
  );
}

export default StudentsPage;