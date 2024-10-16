import Spinner from "./Spinner";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const BotonExcel = ({ children, onClick, loading, ...props }: any) => {
  return (
    <button
    onClick={onClick}
      disabled={loading}
      className={`w-full px-5 py-3 text-base text-white transition duration-300 ease-in-out border rounded-md${loading ? 'cursor-not-allowed' : ''} 
        ${props.disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'cursor-pointer hover:scale-105 border-primaryColor bg-primaryColor hover:bg-blue-800'}`}
      {...props}
    >
       {loading ? <Spinner /> : children}
    </button>
  );
};

export default BotonExcel;