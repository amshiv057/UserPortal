function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateEmail(req, res, next) {
    if (req.body && req.body.email) {
        if (!isValidEmail(req.body.email)) {
            return res.json({
                status: 400,
                error: true,
                message: "Invalid Email"
            })
        }
        next();
    } else {
        return res.json({
            status: 400,
            error: true,
            message: "Invalid Email"
        })
    }
}

export default validateEmail;