interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Boton = ({ children, ...props }: Props) => {
  return (
    <button
      className={`w-full px-5 py-3 text-base text-white transition duration-300 ease-in-out border rounded-md 
        ${props.disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'cursor-pointer hover:scale-105 border-primaryColor bg-primaryColor hover:bg-blue-800'}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Boton;