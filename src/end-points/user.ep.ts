import { NextFunction, Request, Response } from 'express';
import { Util } from '../common/util';
import { UserDao } from '../dao/user.dao';
import { IUser } from '../schemas/user.model';
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
            return Util.sendSuccess(res, user);
        } else {
            const errorMessage = result.value;
            return Util.sendError(res, errorMessage);
        }

    }

    export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
        const users = await UserDao.getAllUsers();
        return Util.sendSuccess(res, users);
    }

    export async function getUserById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        const user = await UserDao.getUserById(userId);
        return Util.sendSuccess(res, user);
    }

    export async function getUserByEmail(req: Request, res: Response, next: NextFunction) {
        const email = req.params.email;
        const user = await UserDao.getUserByEmail(email);
        return Util.sendSuccess(res, user);
    }

    export async function createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData : IUser = req.body.userData;
            const user = await UserDao.createUser(userData);
            return Util.sendSuccess(res, user);
        }
        catch (e) {
            const errorMessage = "Something Wrong";
            return Util.sendError(res, errorMessage);
        }
        
    }

    export async function updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData : IUser = req.body.userData;
            const userId = userData.id;
            const user = await UserDao.updateUser(userId, userData);
            return Util.sendSuccess(res, user);
        } 
        catch (e) {
            const errorMessage = "Something Wrong";
            return Util.sendError(res, errorMessage);
        }
    }

    export async function deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId : string = req.body.userId;
            await UserDao.deleteUser(userId);
            const message = "User deleted"
            return Util.sendSuccess(res, message);
        } 
        catch (e) {
            const errorMessage = "Something Wrong";
            return Util.sendError(res, errorMessage);
        }
    }

    export async function createUsers(req: Request, res: Response, next: NextFunction) {
        try {
            let usersData : IUser[] = req.body.usersData;
            const dbUsers = await UserDao.getAllUsers();
            const dbUsersEmail = dbUsers.map(user => user.email);
            usersData = usersData.filter(user => !dbUsersEmail.includes(user.email));
            usersData = usersData.map(user => {
                user.password = process.env.DEFAULT_PASSWORD;
                return user;
            })
            const users = await UserDao.createUsers(usersData);
            return Util.sendSuccess(res, users);
        } 
        catch (e) {
            const errorMessage = "Something Wrong";
            return Util.sendError(res, errorMessage);
        }
    }

    export async function updateUsers(req: Request, res: Response, next: NextFunction) {
        try {
            let usersData : IUser[] = req.body.usersData;
            const dbUsers = await UserDao.getAllUsers();
            for(const dbUser of dbUsers){
                const haveUserData = usersData.filter(user => user.email == dbUser.email)[0];
                if(haveUserData){
                    const userId = dbUser.id;
                    await UserDao.updateUser(userId, haveUserData);
                }
            }
            const users = await UserDao.getAllUsers();
            return Util.sendSuccess(res, users);
        } 
        catch (e) {
            const errorMessage = "Something Wrong";
            return Util.sendError(res, errorMessage);
        }
    }

}