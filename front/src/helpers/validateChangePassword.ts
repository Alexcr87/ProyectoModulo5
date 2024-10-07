 import { IChangePassword, IChangePassworError } from "@/interfaces/IChangePassword";

 export const validateChangePassword = (values: IChangePassword): IChangePassworError => {

         const errors: IChangePassworError = {
         };

    if ( values.password &&  values.password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if ( values.newPassword &&  values.newPassword.length < 8) {
      errors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    }

    if ( values.confirmPassword === values.newPassword ) {
      errors.confirmPassword = 'La confirmacion debe ser igual a la nueva contraseña';
    }

    return errors
};
