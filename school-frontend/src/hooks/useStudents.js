import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

export default function useStudents({page, limit, q, grade, className, gender, sort, order}) {
    const [students, setStudents] = useState([]);
    const [pagination, setPagination]= useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);



    useEffect(() => {
        //to preven errors when the user changes the pages fast
        let cancelled = false;
        
        async function load() {
            try {
                setLoading(true);
                setError("");

                const params = new URLSearchParams();
                params.set("page", String(page));
                params.set("limit", String(limit));
                params.set("sort", sort);
                params.set("order", order);
                if(q) {
                    params.set('q', q);
                }

                if(grade) {
                    params.set("grade", grade);
                }

                if(className) {
                    params.set("class", className);
                }

                if(gender) {
                    params.set("gender", gender);
                }

                const res = await fetch(`${API_URL}/students?${params.toString()}`);
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
    }, [page, limit, q, grade, className, gender, sort, order, refreshKey]);

    const refetch = () => setRefreshKey((k) => k+1);
        
    return {students, pagination, loading, error, refetch};
}