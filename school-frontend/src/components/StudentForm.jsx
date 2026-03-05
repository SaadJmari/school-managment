import { useEffect, useState } from "react";
import "./StudentForm.css";

const emptyForm = {
    firstName: "",
    lastName: "",
    grade: "",
    class: "",
    birthday: "",
    gender: "",
};

function StudentForm({initialValues, onSubmit, onCancel, submitting, submitLabel = "Add"}) {
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState("");

    useEffect(()=> {
        const merged = { 
            ...emptyForm, 
            ...(initialValues
                ? {
                    firstName: initialValues.firstName,
                    lastName: initialValues.lastName,
                    grade: initialValues.grade,
                    class: initialValues.class,
                    birthday: initialValues.birthday,
                    gender: initialValues.gender,
                }
            : {})
            };

        if(merged.birthday && typeof merged.birthday === "string") {
            merged.birthday = merged.birthday.slice(0, 10);
        }

        setForm(merged);
        setError("");
    }, [initialValues]);

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
        const payload = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            grade: form.grade.trim(),
            class: form.class.trim(),
            birthday: form.birthday,
            gender: form.gender.trim(),
        };

        try {
            await onSubmit(payload);

            //Only reset if in create mode (no initialValues)

            if(!initialValues) setForm(emptyForm);
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
                {submitting ? "Saving…" : submitLabel}
                </button>
                <button type="button" onClick={onCancel} disabled={submitting}>
                Cancel
                </button>
            </div>
        </form>
    );
}

export default StudentForm;