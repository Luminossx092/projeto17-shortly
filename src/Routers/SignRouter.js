import { Router } from "express";
import { signIn, signUp } from "../Controllers/Sign.js";
import { ValidateMiddleware } from "../Middlewares/ValidateMiddleware.js";
import { signinSchema } from "../Models/SigninSchema.js";
import { signupSchema } from "../Models/SignupSchema.js";
//import { AddCustomer, GetCustomer, ListCustomers, UpdateCustomer } from "../controllers/CustomersController.js";
//import { CustomerFormatMiddleware } from "../middlewares/CustomersMiddleware.js";

const router = Router();

router.post('/signup',ValidateMiddleware(signupSchema),signUp);
router.post('/signin',ValidateMiddleware(signinSchema), signIn);

export default router;