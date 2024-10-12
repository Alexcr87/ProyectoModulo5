import ICampaign from "@/interfaces/ICampaign";
import ICampaignError from "@/interfaces/ICampaignError";
import ICampaignSinID from "@/interfaces/ICampaignSinId";

export const validateCampaingError = (values: ICampaignSinID): ICampaignError => {

    const errors: ICampaignError = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

if ( values.name &&  values.name.length < 5) {
  errors.name = 'El nombre debe tener al menos 5 caracteres';
}
if ( values.description &&  values.description.length > 255) {
    errors.description = 'La capacidad maxima en la descripcion son 255 caracteres';
}
if ( values.location &&  values.location.length < 5) {
    errors.location = 'La ubicacion debe tener al menos 5 caracteres';
}
if (values.date && values.date < today) {
    errors.date = 'La fecha no puede ser menor o igual a la fecha actual'; 
}


return errors;
};