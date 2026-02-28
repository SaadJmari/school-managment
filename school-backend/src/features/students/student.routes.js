const express = require('express');
const {
    getStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudent,
    updateStudentPatch } = require("./student.controller.js");
const validateObjectId = require("../../middleware/validateObjectId.js");
const validateBody = require("../../middleware/validateBody.js");
const asyncHandler = require("../../utils/asyncHandler.js")
const router = express.Router(); //Create a router instance

const studentFields = ["firstName", "lastName", "grade", "class", "birthday", "gender"];


//POST /students
router.post('/', asyncHandler(createStudent));

//GET /students
router.get('/', asyncHandler(getStudents));

//GET /students/:id (get one student by id)
router.get('/:id', validateObjectId, asyncHandler(getStudentById))

//DELETE /students/:id
router.delete("/:id", validateObjectId, asyncHandler(deleteStudent))

//PUT /students/:id (to update a studnet)
router.put("/:id", validateObjectId, validateBody({allowedFields: studentFields, requiredFields: studentFields}), asyncHandler(updateStudent));

//PATCH /students/:id (to update fewer fields in student)
router.patch("/:id", validateObjectId, validateBody({allowedFields: studentFields, requiredFields: [], requireAtLeastOneField: true}), asyncHandler(updateStudentPatch))

module.exports = router //export the router