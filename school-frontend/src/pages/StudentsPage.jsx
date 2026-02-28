import { useState } from "react";
import useStudents from "../hooks/useStudents";
import StudentsList from "../components/StudentsList";
import PaginationControls from "../components/PaginationControls";
import { deleteStudent } from "../api/students";
import "./StudentsPage.css";

function StudentsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { students, pagination, loading, error, refetch } = useStudents({ page, limit });

  async function handleDelete(id) {
    const ok = window.confirm("Delete this student?");
    if (!ok) return;

    try {
      await deleteStudent(id);

      // edge case: deleting the last item on the page
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
      </div>

      <div className="students-page__list">
        <StudentsList
          students={students}
          onEdit={(student) => console.log("Edit:", student)}
          onDelete={handleDelete}
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