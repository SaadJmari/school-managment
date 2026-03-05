import { Routes, Route } from "react-router-dom"
import StudentsPage from "./pages/StudentsPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import StudentEditPage from "./pages/StudentEditPage";

function App() {
  return (
    <Routes>
      <Route path="/students" element={<StudentsPage/>}/>
      <Route path="/students/:id" element={<StudentDetailsPage/>}/>
      <Route path="/students/:id/edit" element={<StudentEditPage />} />
      <Route path="*" element={<StudentsPage/>}/>
    </Routes>
  )
}

export default App;