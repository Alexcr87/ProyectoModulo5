
interface IPasarela {

id: string,
name: string
payment_type_id: string
thumbnail: string
min_allowed_amount: number,
max_allowed_amount: number,
deferred_capture: string
}

export default IPasarela