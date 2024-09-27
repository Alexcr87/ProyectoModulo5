
import ICandidate from "@/interfaces/ICandidate"

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function getCandidates(): Promise<ICandidate[]> {
    try {
        const res = await fetch(`${APIURL}/candidates`,{
            //next: {revalidate: 1200},
            cache: 'no-cache'
        })
        const candidates = await res.json()
        return candidates

    } catch (error:any) {
        throw new Error(error)
    }
}

export async function getCandidatesByID(id:string): Promise<ICandidate> {
    try {
        const res = await fetch(`${APIURL}/candidates/${id}`,{
            //next: {revalidate: 1200}
             cache: 'no-cache'
        })
        const candidate = res.json()
        return candidate

    } catch (error:any) {
        throw new Error(error)
    }
}

export async function registerCandidate(userData: ICandidate) {
    try {
      const res = await fetch(`${APIURL}/candidates`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!res.ok) {
        const errorData = await res.json(); // Obtener los detalles del error
        throw new Error(
          `Error ${res.status}: ${errorData.message || "Failed to register"}`
        );
      }
      return await res.json();
    } catch (error: any) {
      console.error("Registration error:", error.message);
      throw new Error(
        error.message || `Unknown error occurred during registration.`
      );
    }
  }