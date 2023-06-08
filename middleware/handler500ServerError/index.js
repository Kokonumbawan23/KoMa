function error500ServerError(req, res, next){
    res.status(500).json( {
        status: 'error',
        message: "Internal server error"
    });
}