'use client'
import Spinner from "@/components/ui/Spinner";
import { getCampaigns } from "@/helpers/campaña.helper";
import ICampaign from "@/interfaces/ICampaign";
import Link from "next/link";
import { useEffect, useState } from "react";

const Result = () => {
    const [datas, setDatas] = useState<ICampaign[]>([]); // Inicializamos como array vacío
    const [loading, setLoading] = useState(true); // Estado de cargando
    const [error, setError] = useState<string | null>(null); // Estado de error (opcional)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getCampaigns();
                setDatas(data);
            } catch (err) {
                setError('Error al obtener las campañas');
            } finally {
                setLoading(false); // Cargado completado
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return <div>{error}</div>; // Mostrar mensaje de error
    }

    return (
        <div className="bg-cuartiaryColor min-h-[85vh] justify-center p-8">
            <div className="bg-primaryColor text-white justify-center flex font-bold text-xl mb-2 rounded-t-lg">
                <h1>Resultados</h1>
            </div>
            {datas.length > 0 ? (
                datas.map((data) => {
                    const formattedDate = new Date(data.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });

                    return (
                        <Link href={`/results/${data.id}`} key={data.id}>
                            <div className="bg-white grid grid-cols-4 overflow-hidden">
                                <div className="text-primaryColor font-bold capitalize p-2 flex justify-center">
                                    <h2>{data.name}</h2>
                                </div>
                                <div className="py-2 px-4 border-l-2 flex justify-center">
                                    <p>{data.description}</p>
                                </div>
                                <div className="py-2 px-4 border-l-2 flex justify-center">
                                    <p>{data.location}</p>
                                </div>
                                <div className="py-2 px-4 border-l-2 flex justify-center">
                                    <p>{formattedDate}</p>
                                </div>
                            </div>
                            <hr />
                        </Link>
                    );
                })
            ) : (
                <div>No se encontraron campañas.</div> // Mensaje cuando no hay datos
            )}
        </div>
    );
};

export default Result;
