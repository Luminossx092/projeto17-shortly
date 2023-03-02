import db from '../config/database.connection.js'
import {nanoid} from 'nanoid'

export async function UrlShorten(req, res) {
    const { url } = req.body;
    const {userId} = res.locals.session;
    let shortUrl = nanoid(8);
    let resposta;
    try {
        do {
            shortUrl = nanoid(8);
            resposta = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`,[shortUrl])
        } while (resposta.rowCount>0);
        await db.query(`INSERT INTO urls ("userId","shortUrl",url) VALUES($1,$2,$3)`,[userId,shortUrl,url]);
        res.status(201).send({id: userId,shortUrl});
    } catch (error) {
        res.status(500).send();
    }
}

export async function GetUrlById(req,res){
    const id = req.params.id;
    try {
        const temp = await db.query(`SELECT * FROM urls WHERE id=$1`,[id]);
        if(temp.rowCount==0){
            res.status(404).send();
        }
        res.send({id,shortUrl:temp.rows[0].shortUrl,url:temp.rows[0].url});
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function GetUrlByShortUrl(req,res){
    const shortUrl = req.params.shortUrl;
    try {
        const temp = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`,[shortUrl]);
        if(temp.rowCount==0){
            console.log('temp.rows ,temp.rowCount')
            return res.status(404).send();
        }
        await db.query(`UPDATE urls SET "visualizationCount"="visualizationCount"+1 WHERE id=$1`,[temp.rows[0].id])
        res.redirect(temp.rows[0].url);
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function DeleteUrl(req,res){
    const urlId = req.params.id;
    const userId = res.locals.session?.userId;
    console.log(userId,urlId)
    try {
        const temp = await db.query(`SELECT * FROM urls WHERE id=$1`,[urlId]);
        if(temp.rowCount==0){
            return res.status(404).send();
        }
        if(temp.rows[0].userId !== userId){
            return res.status(401).send();
        }
        console.log(temp.rowCount)
        await db.query(`DELETE FROM urls WHERE id=$1`,[urlId]);
        res.send(204);
    } catch (error) {
        res.status(500).send(error)
    }
}