import { Router } from "express";
import { DeleteUrl, GetUrlById, GetUrlByShortUrl, UrlShorten } from "../Controllers/UrlController";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import { ValidateMiddleware } from "../Middlewares/ValidateMiddleware";
import { UrlGetSchema } from "../Models/UrlGetSchema";
import { UrlShortenSchema } from "../Models/UrlShortenSchema";

//import { AddCustomer, GetCustomer, ListCustomers, UpdateCustomer } from "../controllers/CustomersController.js";
//import { CustomerFormatMiddleware } from "../middlewares/CustomersMiddleware.js";

const router = Router();

router.post('/urls/shorten',ValidateMiddleware(UrlShortenSchema),AuthMiddleware,UrlShorten);
router.get('/urls/:id',GetUrlById);
router.get('/urls/open/:shortUrl',GetUrlByShortUrl);
router.delete('/urls/:id',AuthMiddleware,DeleteUrl);

export default router;