import React from 'react'
interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}

const InputFile = (props: Props) => {
  return (
    <input 
        className="w-full text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none 
        file:bg-primaryColor file:h-full file:border-none file:text-white file:p-3 " 
        {...props}
    />
  )
}

export default InputFile