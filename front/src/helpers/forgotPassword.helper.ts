import { IForgotPassword } from "@/interfaces/IForgotPassword";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export const updatePassword = async (email: string, data: IForgotPassword) => {
    const response = await fetch(`${APIURL}/user/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, 
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword, 
      }),
    });
  
    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(errorText || 'Error al cambiar la contraseña.');
    }
  
    return await response.json();
  };
  
  