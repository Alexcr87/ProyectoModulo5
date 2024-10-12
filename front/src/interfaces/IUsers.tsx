import IGroup from "./IGroup";

interface IUsers {
    id: string,
    name: string,
    dni: number,
    email: string,
    password?: string,
    address?: string,
    city?: string,
    country?: string,
    roles?: [{
        id:number,
        name:string,
        description:string
    }],
    group?:IGroup[]
    isFirstLogin?: boolean
}


export default IUsers;

