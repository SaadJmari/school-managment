import { useEffect, useState } from "react";

const API_URL =  "http://localhost:5000";

export default function useStudentFilterOptions() {
    const [grades, setGrades] = useState([]);
    const [classes, setClasses] = useState([]);
    const [genders, setGenders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${API_URL}/students/filter-options`);
                if(!res.ok) throw new Error(`Request failed: ${res.status}`);

                const data = await res.json();
                if(cancelled) return;

                setGrades(data.grades || []);
                setClasses(data.classes || []);
                setGenders(data.genders || []);
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
    }, [])

    return {grades, classes, genders, loading, error};
}