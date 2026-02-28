const asyncHandler = (fn) => 
    (req, res, next) => 
        Promise.resolve(fn(req, res, next)).catch(next);

/*
    Similar to this 
    async function fn(req,res,next) {
        try {
            ...
        } catch(error) {
            return next(error) 
        }
    }
    
    
    but better since Controllers should not care whether:
    **request is called by express
    **it's wrapped by middleware
    **it's called from tests
    **it's used by another controller

*/


module.exports = asyncHandler;