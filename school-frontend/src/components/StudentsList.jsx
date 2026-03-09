import formatDate from "../utils/formatDate";
import "./StudentsList.css";

function StudentsList({ students, sort, order, onSort, onView, onDelete, onEdit, deletingId }) {
  if (!students || students.length === 0) {
    return <p>No students found</p>;
  }

  function getSortIndicator(column) {
    if(sort !== column) return "";
    return order === "asc" ? " ▲" : " ▼";
  }

  return (
    <table className="students-table">
      <thead>
        <tr>
          <th onClick={() => onSort("firstName")}>First Name{getSortIndicator("firstName")}</th>
          <th onClick={() => onSort("lastName")}>Last Name{getSortIndicator("lastName")}</th>
          <th onClick={() => onSort("birthday")}>Birthday{getSortIndicator("birthday")}</th>
          <th onClick={() => onSort("grade")}>Grade{getSortIndicator("grade")}</th>
          <th onClick={() => onSort("class")}>Class{getSortIndicator("class")}</th>
          <th onClick={() => onSort("gender")}>Gender{getSortIndicator("gender")}</th>
          <th className="students-table__actions-col">Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => {
          const isDeleting = deletingId === s._id;
          return (
          <tr key={s._id}>
            <td className="students-table__name">
              {s.firstName}
            </td>
            <td className="students-table__name">{s.lastName}</td>
            <td className="students-table__muted">{formatDate(s.birthday)}</td>
            <td className="students-table__muted">{s.grade}</td>
            <td className="students-table__muted">{s.class}</td>
            <td className="students-table__muted">{s.gender}</td>
            <td className="students-table__actions">
              <button
                type="button"
                onClick={() => onView?.(s._id)}
                className="students-table__btn"
                disabled={isDeleting}
              >
                View
              </button>
              <button
                type="button"
                onClick={() => onEdit?.(s)}
                className="students-table__btn"
                disabled={isDeleting}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete?.(s._id)}
                className="students-table__btn students-table__btn--danger"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting...":"Delete"}
              </button>
            </td>
          </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default StudentsList;