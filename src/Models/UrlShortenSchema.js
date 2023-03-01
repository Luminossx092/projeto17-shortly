import Joi from "joi";

export const UrlShortenSchema = Joi.object({
    url: Joi.string().uri().required()
})