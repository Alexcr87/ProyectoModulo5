import { IVotesResult } from "@/interfaces/IVotesResult";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function getCampañaByID():Promise<IVotesResult[]>{
    try {
        const res = await fetch(`${APIURL}/votes/campaign/60c1791c-79d8-43f4-81b8-926927704cae/candidates`,{
            //next: {revalidate: 1200},
            cache: 'no-cache'
        })
        const campaña: IVotesResult[] = await res.json()
        return campaña
    } catch (error:any) {
        throw new Error(error)
    }
}

