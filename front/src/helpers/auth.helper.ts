import {  IRegisterProps } from "@/components/Register/TypesRegister";
import { IRegisterCandidate } from "@/components/registerCandidate/TypesRegisterCandidate";
import { IloginProps } from "@/interfaces/ILogin";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterProps) {
  try {
    const res = await fetch(`${APIURL}/auth/sigUp`, {
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

export async function registerCandidate(userData: IRegisterCandidate) {
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

export async function importUser(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${APIURL}/user/import`, {
      method: "POST",
      body: formData,
      headers: {
        // No incluyas el encabezado 'Content-Type'
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Verifica si la respuesta tiene contenido antes de intentar parsearla
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Respuesta no es JSON");
    }
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
}

export async function login (userData: IloginProps){
  try{
      
      const res = await fetch(`${APIURL}/auth/sigIn`,{
          method: "POST",
          headers:{
              "Content-type": "application/json"
          },
          body: JSON.stringify(userData)
      })
      if(res.ok){
          return res.json()
      }else{
          throw Error("usuario o contraseña no coincide con usuario registrado")
      }

  } catch (error: any){
      alert("Usuario o contraseña no coincide con usuario registrado")
  }
  
}