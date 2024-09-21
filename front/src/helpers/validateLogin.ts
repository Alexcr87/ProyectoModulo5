import { IloginError, IloginProps } from "@/interfaces/ILogin";

export const validateFields = (values: IloginProps): IloginError => {

        const errors: IloginError = {
        };

  
    if ( values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'El correo electrónico no es válido';
    }

  
    // if ( values.password &&  values.password.length < 8) {
    //   errors.password = 'La contraseña debe tener al menos 8 caracteres';
    // }

    if (values) {
      if (values.password) {
        if (values.password.length < 8) {
          errors.password = 'La contraseña debe tener al menos 8 caracteres';
        }
     }   else {
      errors.password = 'casilla vacia';
    }
  }


    return errors;
    // setErrors(errors);
  };
