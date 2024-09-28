import React from 'react'
interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>{}

const Select = ({children, ...props}: Props) => {
  return (
    <select 
        className="w-full text-base transition bg-transparent border rounded-md outline-none 
        border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
        dark:focus:border-primaryColor focus-visible:shadow-none p-2" 
        {...props}
    >
        {children}
    </select>
  )
}

export default Select