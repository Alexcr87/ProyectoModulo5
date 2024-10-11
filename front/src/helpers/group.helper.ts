
const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;




export const deleteGroups = async (ids: string[]): Promise<string> => {
  try {
    const response = await fetch(`${APIURL}/groups`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }), 
    });

    if (!response.ok) {
      throw new Error('Error al eliminar grupos');
    }

    const data = await response.text();
    return data; 
  } catch (error) {
    console.error(error);
    throw new Error('Error en la solicitud de eliminación de grupos');
  }
};