const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getStudent(id) {
    const res = await fetch(`${BASE_URL}/students/${encodeURIComponent(id)}`, {method: "GET"});

    if(!res.ok) {
        let message = "Failed to show student";
        try {
            const data = await res.json();
            message = data?.error || data?.message || message;
        } catch{}
        throw new Error(message);
    }

    return res.json();
}

export async function createStudent(payload) {
    const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });

    if(!res.ok) {
        let message = "Failed to create student";
        try {
            const data = await res.json();
            message = data?.error || data?.message || message;
        } catch {}
        throw new Error(message);
    }

    return res.json();
}

export async function updateStudent(id, payload) {
    const res = await fetch(`${BASE_URL}/students/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    if(!res.ok) {
        let message = "Failed to update student";
        try {
            const data = await res.json();
            message = data?.error || data?.message || message;
        } catch {}
        throw new Error(message);
    }
    return res.json();
}

export async function deleteStudent(id) {
    const res = await fetch(`${BASE_URL}/students/${encodeURIComponent(id)}`, {method: "DELETE"});

    if(!res.ok) {
        let message = "Failed to delete student";
        try {
            const data = await res.json();
            message = data?.error || data?.message || message;
        } catch {}
        throw new Error(message);
    }

    return true;
}
