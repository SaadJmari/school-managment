import { useEffect, useState } from "react";
import useStudents from "../hooks/useStudents";
import StudentsList from "../components/StudentsList";
import PaginationControls from "../components/PaginationControls";
import "./StudentsPage.css"

function StudentsPage() {

    const [page, setPage] = useState(1);
    const limit = 10;

    const { students, pagination, loading, error } = useStudents({ page, limit });

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

    return (
        <div className="students-page">
            <h2 className="students-page__header">Students</h2>

            <StudentsList 
                students={students} 
                onEdit={(student=> {console.log("Edit: "), student})} 
                onDelete={(id) => console.log("Delete: ", id)} 
                className="students-page__list"
            />
            <PaginationControls className="students-page__pagination" pagination={pagination} onPrevious={() => setPage((p) => p-1)} onNext={() => setPage((p) => p+1)}/>
        </div>
    )
}

export default StudentsPage;