 import { IChangePassword, IChangePassworError } from "@/interfaces/IChangePassword";

 export const validateChangePassword = (values: IChangePassword): IChangePassworError => {

         const errors: IChangePassworError = {
         };

         const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

    if ( values.password &&  values.password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if ( values.newPassword &&  values.newPassword.length < 8) {
      errors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (values.newPassword && !passwordRegex.test(values.newPassword)) {
        errors.newPassword = 'La nueva contraseña debe contener al menos una mayúscula, un número y un carácter especial';
    }

    if ( values.confirmPassword !== values.newPassword ) {
      errors.confirmPassword = 'La confirmacion debe coincidir con a la nueva contraseña';
    }

    return errors
};
