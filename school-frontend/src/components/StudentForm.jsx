import { useState } from "react";

const initialForm = {
    firstName: "",
    lastName: "",
    grade: "",
    class: "",
    birthday: "",
    gender: "",
};

function StudentForm({onCreate, onCancel, submitting}) {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");

    function update(field) {
        return (e) => setForm((f) => ({ ...f, [field]: e.target.value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const requiredFields = ["firstName", "lastName", "grade", "class", "birthday", "gender"];
        for(const field of requiredFields) {
            if(!String(form[field]).trim()) {
                setError("Please fill in all fields");
                return;
            }
        }

        try {
            await onCreate({
                ...form,
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                grade: form.grade.trim(),
                class: form.class.trim(),
                gender: form.gender.trim(),
            });
            setForm(initialForm);
        } catch(err) {
            setError(err.message || "Something went wrong");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="student-form">
            {error && <p className="student-form__error">{error}</p>}

            <div className="student-form__row">
                <label>
                    First Name
                    <input value={form.firstName} onChange={update("firstName")} />
                </label>

                <label>
                    Last name
                    <input value={form.lastName} onChange={update("lastName")} />
                </label>
            </div>

             <div className="student-form__row">
                <label>
                Grade
                <input value={form.grade} onChange={update("grade")} />
                </label>

                <label>
                Class
                <input value={form.class} onChange={update("class")} />
                </label>
            </div>

            <div className="student-form__row">
                <label>
                Birthday
                <input type="date" value={form.birthday} onChange={update("birthday")} />
                </label>

                <label>
                Gender
                <select value={form.gender} onChange={update("gender")}>
                    <option value="">Select…</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </label>
            </div>

            <div className="student-form__actions">
                <button type="submit" disabled={submitting}>
                {submitting ? "Adding…" : "Add"}
                </button>
                <button type="button" onClick={onCancel} disabled={submitting}>
                Cancel
                </button>
            </div>
        </form>
    );
}

export default StudentForm;