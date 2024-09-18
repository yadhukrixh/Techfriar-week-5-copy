import session from 'express-session';
import { Session } from "express-session";


export interface SessionData extends Session {
    email:string;
    otp:string;
}

