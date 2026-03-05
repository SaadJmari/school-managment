import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudents from "../hooks/useStudents";
import StudentsList from "../components/StudentsList";
import PaginationControls from "../components/PaginationControls";
import StudentForm from "../components/StudentForm";
import { createStudent, updateStudent } from "../api/students";
import useDeleteStudent from "../hooks/useDeleteStudent";
import "./StudentsPage.css";

function StudentsPage() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const limit = 10;

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { students, pagination, loading, error, refetch } = useStudents({ page, limit });
  const { remove, loading: deleting, error: deleteError} = useDeleteStudent();

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
        setPage(1);
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
      await remove(id);

      if (students.length === 1 && page > 1) {
        setPage((p) => p - 1);
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

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="students-page">
      <div className="students-page__header">
        <h2>Students</h2>

        <button type="button" onClick={handleToggleForm}>
          {showForm ? "Close" : "Add student"}
        </button>
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
        <StudentsList 
            students={students} 
            onView={handleView}
            onDelete={handleDelete} 
            onEdit={(student) => {
            setEditingStudent(student);
            setShowForm(true);
          }} 
          deletingId={deletingId}
          />
      </div>

      <div className="students-page__pagination">
        <PaginationControls
          pagination={pagination}
          onPrevious={() => setPage((p) => p - 1)}
          onNext={() => setPage((p) => p + 1)}
        />
      </div>
    </div>
  );
}

export default StudentsPage;