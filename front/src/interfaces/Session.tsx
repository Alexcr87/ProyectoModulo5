import IUser from "./IUser";

export interface userSession {
    token: string,
    userData:{
        id: string;
        address?: string;
        email: string;
        name: string;
        user?:IUser
    }
}