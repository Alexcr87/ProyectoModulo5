import IUsers from "./IUser";

export interface userSession {
    token: string,
    userData:{
        id: string;
        address?: string;
        email: string;
        name: string;
        user:IUsers
        roles:[
            {
                id:number,
                name:string,
                description:string
            }
        ]
    }
}