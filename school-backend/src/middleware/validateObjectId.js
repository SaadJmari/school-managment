const {Types} = require('mongoose');

function validateObjectId(req, res, next) {
    if(!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({error: "Invalid id"});
    }

    next();
}

module.exports = validateObjectId;