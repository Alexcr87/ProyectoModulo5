import ICandidate from "./ICandidate"
import IGroup from "./IGroup";
import IUsers from "./IUsers";

interface ICampaignSinID {
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
  
  export default ICampaignSinID;