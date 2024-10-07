import IGroup from "./IGroup";
import IUsers from "./IUser";

export interface userSession {
    token: string,
    userData:{
        id: string;
        address?: string;
        email: string;
        name: string;
        city: string;
        dni: string;
        country: string;
        user: IUsers;
        roles:[
            {
                id:number,
                name:string,
                description:string
            }
        ];
        groups: IGroup[];
    }
}

export interface updateUserSession {
        id: string;
        address?: string;
        email: string;
        name: string;
        city: string;
        dni: string;
        country: string;
        user: IUsers;
        roles: [
            {
                id:number,
                name:string,
                description:string
            }
        ];
        groups: IGroup[];
}