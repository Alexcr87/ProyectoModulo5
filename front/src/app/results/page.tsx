// 'use client'
// import { getCampaigns } from "@/helpers/campaña.helper";
// import Link from "next/link";
// import { useEffect } from "react";

// const Result = async ()=>{
//     const datas = await getCampaigns()
    
    
//     return(
//      <div className="bg-cuartiaryColor min-h-[85vh] justify-center p-8">
//         <div className="bg-primaryColor text-white justify-center flex font-bold text-xl mb-2 rounded-t-lg">
//             <h1>Resultados</h1>
//         </div>
//         {
//             datas && datas.map((data)=>{
                
//                 const formattedDate = new Date(data.date).toLocaleDateString("es-ES", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   });
              
//                 return(
//                     <Link href={`/results/${data.id}`} key={data.id}>
//                         <div className="bg-white grid grid-cols-4 overflow-hidden">
//                             <div className="text-primaryColor font-bold capitalize p-2 flex justify-center">
//                                 <h2>{data.name}</h2>
//                             </div>
//                             <div className="py-2 px-4 border-l-2 flex justify-center">
//                                 <p>{data.description}</p>
//                             </div>
//                             <div className="py-2 px-4 border-l-2 flex justify-center">
//                                 <p>{data.location}</p>
//                             </div>
//                             <div className="py-2 px-4 border-l-2 flex justify-center">
//                                 <p>{formattedDate}</p>
//                             </div>
//                         </div>
//                         <hr />
//                     </Link>
//                 )
//             })
//         }
//      </div>
//     )
// };
// export default Result