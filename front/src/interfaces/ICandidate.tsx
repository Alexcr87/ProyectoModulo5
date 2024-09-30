import IUsers from "./IUsers"


interface ICandidate{
    id?: string,
    postulation?: string,
    imgUrl: string,
    list?: string,
    proposals?:string[],
    campaignId?:string,
    user:IUsers 
}
 export default ICandidate
