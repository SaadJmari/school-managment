const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function deleteStudent(id) {
    const res = await fetch(`${BASE_URL}/students/${id}`, {method: "DELETE"});

    if(!res.ok) {
        let message = "Failed to delete student";
        try {
            const data = await res.json();
            message = data?.error || data?.message || message;
        } catch {
            //ignore JSON parse errors
        }
        throw new Error(message);
    }

    return true;
}