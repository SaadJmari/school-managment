import { useState } from "react";
import useStudents from "../hooks/useStudents";
import StudentsList from "../components/StudentsList";
import PaginationControls from "../components/PaginationControls";
import StudentForm from "../components/StudentForm";
import { deleteStudent, createStudent } from "../api/students";
import "./StudentsPage.css";

function StudentsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const { students, pagination, loading, error, refetch } = useStudents({ page, limit });

  async function handleCreate(payload) {
    setCreating(true);
    try {
      await createStudent(payload);

      // show the new student immediately
      setShowForm(false);

      if (page !== 1) {
        setPage(1); // triggers fetch
      } else {
        refetch(); // same page → force reload
      }
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Delete this student?");
    if (!ok) return;

    try {
      await deleteStudent(id);

      if (students.length === 1 && page > 1) {
        setPage((p) => p - 1);
        return;
      }

      refetch();
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="students-page">
      <div className="students-page__header">
        <h2>Students</h2>

        <button type="button" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Close" : "Add student"}
        </button>
      </div>

      {showForm && (
        <div className="students-page__form">
          <StudentForm
            onCreate={handleCreate}
            onCancel={() => setShowForm(false)}
            submitting={creating}
          />
        </div>
      )}

      <div className="students-page__list">
        <StudentsList students={students} onDelete={handleDelete} onEdit={(s) => console.log(s)} />
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