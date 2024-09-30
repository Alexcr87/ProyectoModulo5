// Esta interfaz define el formato de los métodos de pago
export interface IPaymentMethod {
  id: string;
  name: string;
}

// Esta interfaz define los paquetes disponibles para pagar
export interface IPackage {
  id: number;
  name: string;
  price: number;
}

// Esta interfaz define los datos que se enviarán al backend al procesar el pago
export interface IPaymentData {
  userId: string;
  packageId: number;
  payerEmail: string;
  paymentMethodId: string;
  installments: number;
  token:any

}
