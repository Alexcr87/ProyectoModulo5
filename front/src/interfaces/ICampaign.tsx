import ICandidate from "./ICandidate"
import IUsers from "./IUsers";

interface ICampaign {
    id?: string;
    name: string;
    description: string;
    location: string;
    date: Date;
    userId:string
    user: IUsers;
    candidates?: [
      ICandidate?
    ]
  }
  
  export default ICampaign;
  