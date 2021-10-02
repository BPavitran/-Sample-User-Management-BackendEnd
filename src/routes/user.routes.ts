import { Express } from "express";
import { UserEp } from "../end-points/user.ep";

export function initUserRoutes(app: Express) {
    app.get('/api/users', UserEp.getAllUsers);
    app.get('/api/user/:id', UserEp.getUserById);
    app.get('/api/user-by-email/:email', UserEp.getUserByEmail);

    app.post('/api/login', UserEp.authenticate);
    app.post('/api/create/user', UserEp.createUser);
    app.post('/api/update/user', UserEp.updateUser);
    app.post('/api/delete/user', UserEp.deleteUser);
}