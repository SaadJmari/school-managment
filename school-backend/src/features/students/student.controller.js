const Student = require("./student.model.js");

async function getStudents(req, res) {

    const MAX_LIMIT = 50;

    //req.query values are strings
    let page = Number.parseInt(req.query.page, 10);
    let limit = Number.parseInt(req.query.limit, 10);

    //Default values + guarding from troll values
    if (!Number.isInteger(page) || page < 1) {
        page = 1;
    }
    if (!Number.isInteger(limit) || limit < 1) {
        limit = 10;
    }
    if (limit > MAX_LIMIT) {
        limit = MAX_LIMIT;
    }

    //How many documents should MongoDB skip
    const skip = limit * (page - 1);

    //Run both queries in parallel
    const [students, totalStudents] = await Promise.all([
        Student.find().skip(skip).limit(limit),
        Student.countDocuments(),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalStudents / limit));

    return res.json({
        students,
        pagination: {
            currentPage: page,
            limit,
            totalStudents,
            totalPages,
            hasPrevious: page > 1,
            hasNext: page < totalPages
        },
    })
}

async function getStudentById(req, res) {
    const {
        id
    } = req.params; // Get the id from the URL


    const student = await Student.findById(id);

    if (!student) {
        return res.status(404).json({
            error: "Student not found"
        });
    }

    return res.status(200).json(student);

}

async function createStudent(req, res) {

    const student = new Student(req.body); //Create from request body
    await student.save(); //Save to DB
    return res.status(201).json(student); //Return the created student

}

async function deleteStudent(req, res) {
    const {
        id
    } = req.params;


    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
        return res.status(404).json({
            error: "Student not found"
        });
    }
    return res.status(200).json({
        message: "Student deleted",
        deletedStudent
    });

}

async function updateStudent(req, res) {
    const {
        id
    } = req.params;
    const body = req.body;


    const updatedStudent = await Student.findByIdAndUpdate(
        id, //the student to update 
        body, //the new data
        {
            new: true, //return the updated student
            runValidators: true //run schema validations on update (required fields, types...)
        }
    )

    if (!updatedStudent) {
        return res.status(404).json({
            error: "Student not found"
        });
    }
    return res.status(200).json(updatedStudent);

}

async function updateStudentPatch(req, res) {
    const {
        id
    } = req.params;
    const body = req.body;


    const updatedStudent = await Student.findByIdAndUpdate(
        id, //the student to update 
        body, //the new data
        {
            new: true, //return the updated student
            runValidators: true //run schema validations on update (required fields, types...)
        }
    )

    if (!updatedStudent) {
        return res.status(404).json({
            error: "Student not found"
        });
    }
    return res.status(200).json(updatedStudent);


}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudent,
    updateStudentPatch
}