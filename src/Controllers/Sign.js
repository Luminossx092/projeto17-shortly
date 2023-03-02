import db from '../config/database.connection.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export async function signIn(req, res) {
    const { email, password } = req.body;
    const user = await db.query("SELECT * FROM users WHERE email = $1",[email]);
    if (user && bcrypt.compareSync(password, user.rows[0].password)) {
        let token;
        const session = await db.query(`SELECT * FROM sessions WHERE "userId"=$1`,[user.rows[0].id]);
        if (session.rowCount>0) {
            token = session.rows[0].token;
        }
        else {
            
            token = uuid();
            await db.query(`INSERT INTO sessions("userId",token) VALUES($1,$2)`,[user.rows[0].id,token]);
        }
        res.send({token});
    } else {
        res.sendStatus(401)
    }
}

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    try {
        const response = await db.query("SELECT * FROM users WHERE email=$1",[email]);
        if (response.rowCount>0) {
            res.status(409).send();
        }
        await db.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3)", [name, email, bcrypt.hashSync(password, 10)] );
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send();
    }
}