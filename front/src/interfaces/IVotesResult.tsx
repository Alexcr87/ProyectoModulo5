export interface IVotesResult{
   candidate:{
    id:string,
    imgUrl: string,
    list: string,
    postulation: string,
    proporsal: string,
   },
   votes:number,
}

export interface IDataVote{
   name: string,
   votes: number,
   image: string,
   backgroundColor:string,
   borderColor: string
}