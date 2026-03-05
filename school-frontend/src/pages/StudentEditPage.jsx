import { useNavigate, useParams } from "react-router-dom";
import useStudent from "../hooks/useStudent";
import StudentForm from "../components/StudentForm";
import { updateStudent } from "../api/students";
import { useState } from "react";

export default function StudentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student, loading, error } = useStudent(id);

  const [submitting, setSubmitting] = useState(false);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!student) return <p>Student not found</p>;

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      await updateStudent(id, payload);
      navigate(`/students/${id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="students-page">
      <h2>Edit Student</h2>

      <StudentForm
        initialValues={student}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/students/${id}`)}
        submitting={submitting}
        submitLabel="Save"
      />
    </div>
  );
}