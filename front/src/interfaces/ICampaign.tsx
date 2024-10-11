import ICandidate from "./ICandidate"
import IGroup from "./IGroup";
import IUsers from "./IUsers";

interface ICampaign {
    id: string;
    name: string;
    description: string;
    location: string;
    date: Date;
    userId:string
    user: IUsers;
    candidates?: [
      ICandidate?
    ]
    groups: IGroup[]
  }
  
  export default ICampaign;
  