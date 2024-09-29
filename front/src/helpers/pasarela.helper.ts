import IPasarela from "@/interfaces/IPasarela";


// const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

// export async function getMethodBuy(): Promise<IPasarela[]> {
//     try {
//         const res = await fetch(`${APIURL}/payments/methods`,{
//             cache: 'no-cache' 
//         })
//         const payments = await res.json()
//         return payments

//     } catch (error:any) {
//         throw new Error(error)
//     }
// }

const payments = [
    {
      "id": "master",
      "name": "Mastercard",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/0daa1670-5c81-11ec-ae75-df2bef173be2-xl@2x.png",
      "min_allowed_amount": 3,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "tarshop",
      "name": "Tarjeta Shopping",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/33ea00e0-571a-11e8-8364-bff51f08d440-xl@2x.png",
      "min_allowed_amount": 15,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "cencosud",
      "name": "Cencosud",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/e8ffdc40-5dc7-11ec-ae75-df2bef173be2-xl@2x.png",
      "min_allowed_amount": 15,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "diners",
      "name": "Diners",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/751ea930-571a-11e8-9a2d-4b2bd7b1bf77-xl@2x.png",
      "min_allowed_amount": 15,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "cmr",
      "name": "CMR",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/26fbb110-571c-11e8-95d8-631c1a9a92a9-xl@2x.png",
      "min_allowed_amount": 15,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "debcabal",
      "name": "Cabal Débito",
      "payment_type_id": "debit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/c9f71470-6f07-11ec-9b23-071a218bbe35-xl@2x.png",
      "min_allowed_amount": 3,
      "max_allowed_amount": 15000000,
      "deferred_capture": "unsupported"
    },
    {
      "id": "maestro",
      "name": "Maestro",
      "payment_type_id": "debit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/ce454480-445f-11eb-bf78-3b1ee7bf744c-xl@2x.png",
      "min_allowed_amount": 3,
      "max_allowed_amount": 15000000,
      "deferred_capture": "unsupported"
    },
    {
      "id": "debvisa",
      "name": "Visa Débito",
      "payment_type_id": "debit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/d589be70-eb86-11e9-b9a8-097ac027487d-xl@2x.png",
      "min_allowed_amount": 3,
      "max_allowed_amount": 15000000,
      "deferred_capture": "unsupported"
    },
    {
      "id": "naranja",
      "name": "Naranja",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/af139ad0-d705-11ee-8925-8314c09d1640-xl@2x.png",
      "min_allowed_amount": 15,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "argencard",
      "name": "Argencard",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/d7e55980-f3be-11eb-8e0d-6f4af49bf82e-xl@2x.png",
      "min_allowed_amount": 15,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "cabal",
      "name": "Cabal",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/c9f71470-6f07-11ec-9b23-071a218bbe35-xl@2x.png",
      "min_allowed_amount": 15,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "amex",
      "name": "American Express",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/b08cf800-4c1a-11e9-9888-a566cbf302df-xl@2x.png",
      "min_allowed_amount": 3,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "debmaster",
      "name": "Mastercard Débito",
      "payment_type_id": "debit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/0daa1670-5c81-11ec-ae75-df2bef173be2-xl@2x.png",
      "min_allowed_amount": 3,
      "max_allowed_amount": 15000000,
      "deferred_capture": "unsupported"
    },
    {
      "id": "visa",
      "name": "Visa",
      "payment_type_id": "credit_card",
      "thumbnail": "https://http2.mlstatic.com/storage/logos-api-admin/d589be70-eb86-11e9-b9a8-097ac027487d-xl@2x.png",
      "min_allowed_amount": 3,
      "max_allowed_amount": 15000000,
      "deferred_capture": "supported"
    },
    {
      "id": "pagofacil",
      "name": "Pago Fácil",
      "payment_type_id": "ticket",
      "thumbnail": "https://www.mercadopago.com/org-img/MP3/API/logos/pagofacil.gif",
      "min_allowed_amount": 50,
      "max_allowed_amount": 1000000,
      "deferred_capture": "does_not_apply"
    },
    {
      "id": "rapipago",
      "name": "Rapipago",
      "payment_type_id": "ticket",
      "thumbnail": "https://www.mercadopago.com/org-img/MP3/API/logos/rapipago.gif",
      "min_allowed_amount": 50,
      "max_allowed_amount": 1000000,
      "deferred_capture": "does_not_apply"
    }
  ]
    
export default payments