

interface ICandidate{
     imgUrl?: string
user: {
    id: string,
    name: string,
    dni: number,
    email: string,
    password?: string,
    address?: string,
    city?: string,
    country?: string,
    rol?: string,
    suffrage?: boolean,
}
}

 export default ICandidate
