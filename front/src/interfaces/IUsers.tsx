interface IUsers {

    id: number,
    name: string,
    dni: number,
    email: string,
    password?: string,
    address?: string,
    city?: string,
    country?: string,
    rol?: string,
    isFirstLogin?: boolean
}


export default IUsers;

