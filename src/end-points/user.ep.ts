import { NextFunction, Request, Response } from 'express';
import { Util } from '../common/util';
import { UserDao } from '../dao/user.dao';
const Joi = require('@hapi/joi');

export namespace UserEp {

    export async function authenticate(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate({
            email: req.body.email,
            password: req.body.password,
        });

        if(error){
            Util.sendError(res, error.details[0].message);
        }

        const email = req.body.email;
        const password = req.body.password;

        const result : {success : boolean, value : string}= await UserDao.authenticateUser(email, password);
        if(result.success) {
            const user = result.value;
            console.log(user)
            return Util.sendSuccess(res, user);
        } else {
            const errorMessage = result.value;
            return Util.sendError(res, errorMessage);
        }

      }

}