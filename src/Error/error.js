export function methodError(req, res, next){
    const error = new Error("Oops Method Not allowed")
    error.status = 405
    next(error)
}

export function serverError(error, req, res, next){
    res.status(error.status || 500).send({status: error.status, message: error.message})
    next()
}