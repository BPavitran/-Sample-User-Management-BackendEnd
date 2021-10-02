import {Express, Request, Response} from 'express';
import { Util } from "../common/util";
import { initUserRoutes } from './user.routes';

export function initRoutes(app: Express) {
    app.get('/api', (req: Request, res: Response) => Util.sendSuccess(res, "Api Works"));

    initUserRoutes(app);

    /* ALL OTHER REQUESTS */
    app.all('*', (req: Request, res: Response) => Util.sendError(res, "Route Not Found"));
}