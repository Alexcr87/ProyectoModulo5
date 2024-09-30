"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Boton from "../ui/Boton";
import Input from "../ui/Input";
import { IPackage, IPaymentData, IPaymentMethod } from "@/interfaces/IPayments";
import { initMercadoPago, createCardToken } from "@mercadopago/sdk-react";

// Inicializa MercadoPago
initMercadoPago("YOUR_PUBLIC_KEY"); // Reemplaza con tu clave pública

const PaymentForm = () => {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [installments, setInstallments] = useState<number>(1);
  const [packageId, setPackageId] = useState<number | null>(null);
  const [payerEmail, setPayerEmail] = useState<string>("");
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    securityCode: "",
    cardholderName: "",
    identificationType: "DNI",
    identificationNumber: "",
  });

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const res = await fetch("http://localhost:3000/payments/methods");
      const methods: IPaymentMethod[] = await res.json();
      setPaymentMethods(methods);
    };

    const fetchPackages = async () => {
      const res = await fetch("http://localhost:3000/payments/packages");
      const pkgs: IPackage[] = await res.json();
      setPackages(pkgs);
    };

    fetchPaymentMethods();
    fetchPackages();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Generar el token de la tarjeta
    const { cardNumber, cardExpirationMonth, cardExpirationYear, securityCode, cardholderName, identificationType, identificationNumber } = cardData;

    const tokenResponse = await createCardToken({
      cardNumber,
      cardExpirationMonth,
      cardExpirationYear,
      securityCode,
      cardholderName,
      identificationType,
      identificationNumber,
    });

    if (tokenResponse.error) {
      console.error("Error al generar el token de la tarjeta:", tokenResponse);
      Swal.fire({
        icon: "error",
        title: "Error al generar el token de la tarjeta",
        text: tokenResponse.error.message,
      });
      return;
    }

    const cardToken = tokenResponse.id; // El token generado de la tarjeta

    // Ahora puedes enviar el token al backend junto con otros datos
    const paymentData: IPaymentData = {
      userId: "user-id-ejemplo", // Este valor debería venir de la sesión del usuario
      packageId: packageId!,
      payerEmail,
      paymentMethodId: selectedMethod,
      installments,
      token: cardToken, // Enviar el token de la tarjeta
    };

    const res = await fetch("http://localhost:3000/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const result = await res.json();

    if (result.paymentResponse.status === "approved") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Pago realizado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/success");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al procesar el pago",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
      <div className="col-start-1 col-end-13">
        <div className="grid grid-cols-12">
          <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl">
            REALIZAR PAGO
          </div>
        </div>

        <div className="flex flex-col">
          {/* Email del pagador */}
          <Input
            id="payer-email"
            name="payerEmail"
            type="email"
            value={payerEmail}
            onChange={(e) => setPayerEmail(e.target.value)}
            placeholder="Correo Electrónico"
          />

          {/* Selección de paquete */}
          <select
            name="packageId"
            value={packageId || ""}
            onChange={(e) => setPackageId(Number(e.target.value))}
            className="mt-4"
          >
            <option value="">Selecciona un paquete</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} - ${pkg.price}
              </option>
            ))}
          </select>

          {/* Selección de método de pago */}
          <select
            name="paymentMethodId"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="mt-4"
          >
            <option value="">Selecciona un método de pago</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>

          {/* Selección de cuotas */}
          <Input
            id="installments"
            name="installments"
            type="number"
            value={installments}
            onChange={(e) => setInstallments(Number(e.target.value))}
            placeholder="Número de Cuotas"
            className="mt-4"
          />

          {/* Campos de la tarjeta */}
          <Input
            id="card-number"
            name="cardNumber"
            type="text"
            value={cardData.cardNumber}
            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
            placeholder="Número de tarjeta"
          />

          <div className="flex space-x-4">
            <Input
              id="card-expiration-month"
              name="cardExpirationMonth"
              type="text"
              value={cardData.cardExpirationMonth}
              onChange={(e) =>
                setCardData({ ...cardData, cardExpirationMonth: e.target.value })
              }
              placeholder="Mes de Expiración (MM)"
            />

            <Input
              id="card-expiration-year"
              name="cardExpirationYear"
              type="text"
              value={cardData.cardExpirationYear}
              onChange={(e) =>
                setCardData({ ...cardData, cardExpirationYear: e.target.value })
              }
              placeholder="Año de Expiración (YYYY)"
            />
          </div>

          <Input
            id="security-code"
            name="securityCode"
            type="text"
            value={cardData.securityCode}
            onChange={(e) =>
              setCardData({ ...cardData, securityCode: e.target.value })
            }
            placeholder="Código de Seguridad (CVV)"
          />

          <Input
            id="cardholder-name"
            name="cardholderName"
            type="text"
            value={cardData.cardholderName}
            onChange={(e) =>
              setCardData({ ...cardData, cardholderName: e.target.value })
            }
            placeholder="Nombre del titular"
          />

          <Input
            id="identification-number"
            name="identificationNumber"
            type="text"
            value={cardData.identificationNumber}
            onChange={(e) =>
              setCardData({ ...cardData, identificationNumber: e.target.value })
            }
            placeholder="Número de identificación"
          />

          <Boton type="submit" className="mt-6">
            Pagar
          </Boton>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
