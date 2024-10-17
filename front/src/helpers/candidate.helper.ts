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
            next: {revalidate: 1200}
             //cache: 'no-cache'
        })
        const candidate = await res.json()
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
          `Error ${res.status}: ${errorData.message || "No se pudo registrar"}`
        );
      }
      return await res.json();
    } catch (error: any) {
      console.error("Registration error:", error.message);
      throw new Error(
        error.message || `Ocurrió un error desconocido durante el registro.`
      );
    }
  }

  export async function updateCandidateById(userData:ICandidate, id:string) {
    try {
        const res = await fetch(`${APIURL}/candidates/${id}`,{
            method:"PATCH",
            headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(userData),
        })
        if (!res.ok) {
            return "respuesta error"
        }
        const user = await res.json()
        
        return user
        
    } catch (error:any) {
        throw new Error(error)
    }
  }