import ICandidate from "@/interfaces/ICandidate"

const APIURL = "http://localhost:3000"

export async function getCandidates(): Promise<ICandidate[]> {
    try {
        const res = await fetch(`${APIURL}/candidates`,{
            next: {revalidate: 1200}
        })
        const candidates = res.json()
        return candidates

    } catch (error:any) {
        throw new Error(error)
    }
}

export async function getCandidatesByID(id:string): Promise<ICandidate> {
    try {
        const res = await fetch(`${APIURL}/candidates/${id}`,{
            next: {revalidate: 1200}
        })
        const candidate = res.json()
        return candidate

    } catch (error:any) {
        throw new Error(error)
    }
}