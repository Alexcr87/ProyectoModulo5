

interface ICandidate{
    // id?: string,
    // imgUrl?: string
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






// interface ICandidate{
//     id: number,
//     postulation: string,
//     imgUrl: string,
//     list: string,
//     campaignDescription: string,
//     proposals: string[],
//     userId: number
// }

// export default ICandidate