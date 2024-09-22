import IUser from "@/interfaces/IUser";

const Cartrender:React.FC<IUser> = ({...user}) => {
return (
    <div className="flex flex-col  justify-between mx-4 my-4 rounded-2xl bg-white shadow dark:bg-gray-800 dark:border-gray-700 "  >
        
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
  {/* <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-60">
    <img className="h-60 w-72 m-auto"
   src={image} alt={`imagen del producto ${name}`} />
  </div> */}
  <div className="p-6">
    <div className="flex items-center justify-between mb-2">
      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
      ${user.user.id}
      </p>
      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
      $ {user.user.name} 
      </p>
    </div>
    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
       ` stock: {user.user.dni}`
    </p>
  </div>
  <div className="p-6 pt-0">
  </div>
</div>

    </div>

    

)
}

export default Cartrender