import { useParams, useNavigate } from "react-router-dom";
import useStudent from "../hooks/useStudent";
import useDeleteStudent from "../hooks/useDeleteStudent";
import StudentDetailsCard from "../components/StudentDetailsCard";

function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { student, loading, error } = useStudent(id);
  const { remove, loading: deleting } = useDeleteStudent();

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!student) return <p>Student not found</p>;

  async function handleDelete() {
    const ok = window.confirm("Delete this student?");
    if (!ok) return;

    await remove(id);
    navigate("/students");
  }

  return (
    <StudentDetailsCard
      student={student}
      deleting={deleting}
      onBack={() => navigate("/students")}
      onEdit={() => navigate(`/students/${id}/edit`)}
      onDelete={handleDelete}
    />
  );
}

export default StudentDetailsPage;