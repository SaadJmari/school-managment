import { useEffect, useState } from "react";
import { getStudent } from "../api/students";


export default function useStudent(id) {
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchStudent() {
        setLoading(true);
        setError(null);

        try {
            const student = await getStudent(id);
            setStudent(student);
        }
        catch(err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!id) return;
        setStudent(null);
        fetchStudent();
    }, [id]);

    return {student, loading, error, refetch: fetchStudent};
}