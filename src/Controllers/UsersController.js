import db from '../config/database.connection.js'

export async function GetUserInfo(req, res) {
    const {userId} = res.locals?.sessions;
    try {
        const res = await db.query(`SELECT urls `);
        res.send({});
    } catch (error) {
        
    }
}

export async function GetRanking(req, res) {
    try {
        const res = await db.query(`SELECT urls `);
        res.send({});
    } catch (error) {
        
    }
} 
