import ICandidate from "@/interfaces/ICandidate";

const Cartrender:React.FC<ICandidate> = ({...candidate}) => {
return (
    <div className="flex flex-row  justify-between mx-4 my-4 rounded-2xl bg-white shadow dark:bg-gray-800 dark:border-gray-700 "  >
        
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-60">
    <img className="h-60 w-72 m-auto"
   src={candidate.imgUrl} alt={`imagen del producto ${candidate.user.name}`} />
  </div>
  <div className="p-6">
    <div className="flex items-center justify-between mb-2">
      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
      {candidate.user.id}
      </p>
      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
      {candidate.user.name} 
      </p>
    </div>
    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
       ` Dni: {candidate.user.dni}`
    </p>
  </div>
  <div className="p-6 pt-0">
  </div>
</div>

    </div>

    

)
}

export default Cartrender