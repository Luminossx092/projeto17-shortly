import db from '../config/database.connection.js'

export async function GetUserInfo(req, res) {
    const {userId} = res.locals?.session;
    console.log(userId)
    try {
        const temp = await db.query(`SELECT users.id as id, users.name as name,SUM(urls."visualizationCount") as "visitCount"
        FROM users 
        JOIN urls 
        ON urls."userId"=users.id 
        WHERE users.id = $1
        GROUP BY users.id`,[userId]);
        const temp2 = await db.query(`SELECT id,"shortUrl",url,"visualizationCount" as "visitCount" FROM urls WHERE "userId"=$1`,[userId])
        res.send({...temp.rows[0],shortenedUrls: [...temp2.rows]});
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function GetRanking(req, res) {
    try {
        const temp = await db.query(`SELECT users.id as id, users.name as name,COUNT(urls.id) as "linksCount",SUM(urls."visualizationCount") as "visitCount"
        FROM users 
        JOIN urls 
        ON urls."userId"=users.id 
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10`);
        console.log(temp.rows)
        res.send([...temp.rows]);
    } catch (error) {
        res.status(500).send(error);
    }
} 
