import db from '../config/database.connection.js'

export async function AuthMiddleware(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).send();

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token=$1`,[token]);
        if (session.rowCount==0) return res.status(401).send("");
        res.locals.session = session.rows[0];
        next();

    } catch (error) {
        res.status(500).send(error)
    }
}