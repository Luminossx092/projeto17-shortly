import { Router } from "express";
import { DeleteUrl, GetUrlById, GetUrlByShortUrl, UrlShorten } from "../Controllers/UrlController.js";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware.js";
import { ValidateMiddleware } from "../Middlewares/ValidateMiddleware.js";
import { UrlShortenSchema } from "../Models/UrlShortenSchema.js";

//import { AddCustomer, GetCustomer, ListCustomers, UpdateCustomer } from "../controllers/CustomersController.js";
//import { CustomerFormatMiddleware } from "../middlewares/CustomersMiddleware.js";

const router = Router();

router.post('/urls/shorten',ValidateMiddleware(UrlShortenSchema),AuthMiddleware,UrlShorten);
router.get('/urls/:id',GetUrlById);
router.get('/urls/open/:shortUrl',GetUrlByShortUrl);
router.delete('/urls/:id',AuthMiddleware,DeleteUrl);

export default router;