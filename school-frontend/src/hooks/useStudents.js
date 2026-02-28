import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

export default function useStudents({page, limit}) {
    const [students, setStudents] = useState([]);
    const [pagination, setPagination]= useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        //to preven errors when the user changes the pages fast
        let cancelled = false;
        
        async function load() {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${API_URL}/students?page=${page}&limit=${limit}`);
                if(!res.ok) throw new Error(`Request failed: ${res.status}`);

                const data = await res.json();
                if(cancelled) return;

                setStudents(data.students);
                setPagination(data.pagination);
            } catch(err) {
                if(cancelled) return;
                setError(err.message || "Something went wrong");
            } finally {
                if(cancelled) return;
                setLoading(false);
            }
        }
        load();

        return () => {
            cancelled = true;
        };
    }, [page, limit]);
        
    return {students, pagination, loading, error};
}