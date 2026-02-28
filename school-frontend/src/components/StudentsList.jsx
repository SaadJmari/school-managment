import formatDate from "../utils/formatDate";
import "./StudentsList.css"

function StudentsList({students, onDelete, onEdit}) {
    if(!students || students.length === 0 ) {
        return <p>No students found</p>;
    }

    return (
        <table className="students-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Birthday</th>
                    <th>Grade</th>
                    <th>Class</th>
                    <th className="students-table__actions-col">Actions</th>
                </tr>
            </thead>

            <tbody>
                {students.map((s) => (
                    <tr key={s._id}>
                        <td className="students-table__name">
                            {s.firstName} {s.lastName}
                        </td>
                        <td className="student-table__muted">{formatDate(s.birthday)}</td>
                        <td className="students-table__muted">{s.grade}</td>
                        <td className="students-table__muted">{s.class}</td>
                        <td className="students-table__actions">
                            <button 
                                type="button"
                                onClick={() => onEdit?.(s._id)}
                                className="students-table__btn"    
                            >
                                Edit
                            </button>
                            <button 
                                type="button"
                                onClick={() => onDelete?.(s._id)}
                                className="students-table__btn students-table__btn--danger"    
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default StudentsList;