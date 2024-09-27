interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const Boton2 = ({children, ...props}:Props) => {
  return (
    <button
        className="w-full px-5 py-3 font-bold text-base text-primaryColor transition duration-300 ease-in-out border rounded-md cursor-pointer border-white bg-white hover:bg-cuartiaryColor hover:scale-105"
        {...props}
        
    >
     {children}  
    </button>
  )
}

export default Boton2