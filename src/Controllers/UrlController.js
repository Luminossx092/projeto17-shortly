import db from '../config/database.connection.js'
import {nanoid} from 'nanoid'

export async function UrlShorten(req, res) {
    const { url } = req.body;
    const shortUrl = nanoid(8);
    try {
        const res = await db.query(`INSERT INTO urls `);
        res.status(201).send({id: res.id,shortUrl});
    } catch (error) {
        
    }
}

export async function GetUrlById(req,res){
    const id = req.params.id;
    console.log(id);
    try {
        const temp = await db.query("SELECT * FROM urls");
        if(temp.rowCount==0){
            res.status(404).send();
        }
        res.send({id,shortUrl:temp.shortUrl,url:temp.url});
    } catch (error) {
        
    }
}

export async function GetUrlByShortUrl(req,res){
    const shortUrl = req.params.shortUrl;
    try {
        const temp = await db.query("SELECT * FROM urls WHERE id=$1",shortUrl);
        //await db.query(`UPDATE visitas FROM urls ` )
        if(temp.rowCount==0){
            res.status(404).send();
        }
        res.redirect(temp.url);
    } catch (error) {
        
    }
}

export async function DeleteUrl(req,res){
    const userId = res.locals.sessions?.userId;
    try {
        const temp = await db.query(`SELECT `);
        res.send(204);
    } catch (error) {
        res.status(500).send()
    }
}