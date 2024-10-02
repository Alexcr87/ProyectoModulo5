export interface IVotesResult{
    id:string,
    imgUrl: string,
    list: string,
    postulation: string,
    proporsal: string,
    user:{
      name:string
      country:string
    }
   ,
   votes:number,
}

export interface IDataVote{
   name: string,
   votes: number,
   image: string,
   backgroundColor:string,
   borderColor: string
}