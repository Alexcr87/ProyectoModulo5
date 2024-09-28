import React from 'react'
interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}

const Input = (props: Props) => {
  return (
    <input 
        className="w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none" 
        {...props}
    />
  )
}

export default Input
