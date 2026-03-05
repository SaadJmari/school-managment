import formatDate from "../utils/formatDate";
import "./StudentForm.css";

function Field({ label, value }) {
  return (
    <div>
      <strong>{label}</strong>
      <div>{value || "—"}</div>
    </div>
  );
}

function StudentDetailsCard({ student, onBack, onEdit, onDelete, deleting }) {
  return (
    <div className="student-form">
      <div className="student-form__row">
        <Field label="First Name" value={student.firstName} />
        <Field label="Last Name" value={student.lastName} />
      </div>

      <div className="student-form__row">
        <Field label="Grade" value={student.grade} />
        <Field label="Class" value={student.class} />
      </div>

      <div className="student-form__row">
        <Field label="Birthday" value={formatDate(student.birthday)} />
        <Field label="Gender" value={student.gender} />
      </div>

      <div className="student-form__actions">
        <button type="button" onClick={onBack}>
          Back
        </button>

        <button type="button" onClick={onEdit}>
          Edit
        </button>

        <button type="button" onClick={onDelete} disabled={deleting}>
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default StudentDetailsCard;