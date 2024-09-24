export interface IRegisterCandidateProps {
    postulation: string,
    list:string,
    campaignDescription:string,
    proposals: string,
    file: string,
}
export type IRegisterCandidateError = Partial<IRegisterCandidateProps>

export interface IRegisterCandidate {
    postulation: string,
    list:string,
    campaignDescription:string,
    proposals: string[],
    file: string,
    userId:string | undefined
}