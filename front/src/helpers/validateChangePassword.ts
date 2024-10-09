import { IChangePassword, IChangePasswordError } from "@/interfaces/IChangePassword";


export const validateChangePassword = (values: IChangePassword): IChangePasswordError => {

        const errors: IChangePasswordError = {};
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/;

    if ( values.password &&  values.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if ( values.newPassword &&  values.newPassword.length < 8) {
      errors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    } 
    
    if ( values.newPassword && !passwordRegex.test(values.newPassword)) {
        errors.newPassword = 'La nueva contraseña debe contener al menos una mayúscula, un número y un carácter especial';
    }

    if ( values.newPassword !==  values.confirmPassword) {
        errors.confirmPassword = 'La confirmación debe coincidir con la contraseña nueva';
    }
    
    return errors;
  };
