import ICampaign from "@/interfaces/ICampaign";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function getCampañaByID():Promise<ICampaign>{
    try {
        const res = await fetch(`${APIURL}/campaigns/60c1791c-79d8-43f4-81b8-926927704cae`,{
            //next: {revalidate: 1200},
            cache: 'no-cache'
        })
        const campaña = await res.json()
        return campaña
    } catch (error:any) {
        throw new Error(error)
    }
}

export interface IVotosResult{
    name: string,
    votes: number,
    image: string,
    backgroundColor:string,
    borderColor:string
}