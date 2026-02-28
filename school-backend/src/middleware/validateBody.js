function validateBody({allowedFields, requiredFields, requireAtLeastOneField = false}) {
    return (req, res, next) => {
        //Basic guard: body must be a plain object
        if(!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
            return res.status(400).json({error: "Request body must be a JSON object"});
        }

        const bodyKeys = Object.keys(req.body);

        //Verify if only updating few fields
        if(requireAtLeastOneField && bodyKeys.length === 0) {
            return res.status(400).json({error: "Body cannot be empty"});
        }

        //Verifying unknown fields
        const unknownFields = bodyKeys.filter((key) => !allowedFields.includes(key));
        if(unknownFields.length > 0) {
            return res.status(400).json({error: `Unknown field(s): ${unknownFields.join(", ")}`});
        }

        //Verifying missing fields
        const missingFields = requiredFields.filter((field)=> req.body[field] === undefined);
        if (missingFields.length > 0) {
            return res.status(400).json({error: `Missing field(s): ${missingFields.join(", ")}`});
        }

        next();
    }
}

module.exports = validateBody;