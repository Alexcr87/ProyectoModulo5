import ICandidate from "@/interfaces/ICandidate";

const Cartrender:React.FC<ICandidate> = ({...candidate}) => {
  
return (
    <div className="flex flex-row  justify-between mx-4 my-4 rounded-2xl bg-white shadow dark:bg-gray-800 dark:border-gray-700 "  >

        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-60">
    <img className="h-60 w-72 m-auto"
   src={candidate.imgUrl} alt={`imagen del candidato ${candidate.user.name}`} />
  </div>
  <div className="px-6 pt-2">
    <div className="flex justify-center">
      <p className="font-bold text-2xl capitalize">{candidate.user.name}</p>
    </div>
      <div className="flex flex-col">
        <p className="font-bold">Postulacion:</p>
        <p>{candidate.postulation}</p>
        <p className="self-center my-4">{candidate.list}</p>
      </div>
  </div>
</div>

    </div>
)
}

export default Cartrender