import { IChangePassword } from "@/interfaces/IChangePassword";
import Swal from "sweetalert2";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function changePassword (userData: IChangePassword){
  try{
      
      const res = await fetch(`${APIURL}/auth/newPasswordChange`,{
          method: "POST",
          headers:{
              "Content-type": "application/json"
          },
          body: JSON.stringify(userData)
      })
      if(res.ok){
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
          }
          });
          Toast.fire({
              icon: "success",
              title: "contraseña cambiada con exito"
          });
          return res.json()
      }else{
          throw Error("usuario o contraseña no coincide con usuario registrado")
      }

  } catch (error: any){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "incorrect password"
    });
    return
  }
  
}