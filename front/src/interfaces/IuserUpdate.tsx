import ICandidate from "./ICandidate"

interface IUserUpdate {
    
    id: number,
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
    suffrage?: boolean,
    candidate?: ICandidate

}

export default IUserUpdate;

