import { getCampaigns } from "@/helpers/campaña.helper";
import Link from "next/link";

const Result = async ()=>{
    const datas = await getCampaigns()
    
    return(
     <div className="grid grid-cols-4 gap-4 bg-cuartiaryColor min-h-[85vh] justify-center p-8">
        {
            datas && datas.map((data)=>{
                return(
                    <Link href={`/results/${data.id}`}>
                        <div className="bg-white rounded-2xl h-40 overflow-hidden">
                            <div className="bg-primaryColor text-white p-2 flex justify-center">
                                <h2>{data.name}</h2>
                            </div>
                            <div className="py-2 px-4">
                                <p>{data.description}</p>
                            </div>
                        </div>
                    </Link>
                )
            })
        }
     </div>
    )
};
export default Result