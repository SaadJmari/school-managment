import { useState } from "react";
import { deleteStudent } from "../api/students";

export default function useDeleteStudent() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function remove(id) {
        setError(null);
        setLoading(true);
        try {
            
            await deleteStudent(id);
            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }
    return {remove, loading, error};
}

