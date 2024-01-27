import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
    // const token = req.header('Authorization');
    const token = req.cookies.token;

    try {
        req.user = jwt.verify(token, "hi");
        next();
    } catch (error) {
        res.clearCookie("token")
        return res.redirect('/login')
    }

}
export default { authenticateToken };