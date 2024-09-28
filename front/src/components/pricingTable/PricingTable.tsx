import React from 'react'
import Boton from '../ui/Boton'
import Boton2 from '../ui/Boton2'

const PricingTable = () => {
  return (
    <div className='h-[100vh]'>
        <div className='flex flex-col items-center text-center'>
            <h1 className='text-4xl font-bold py-8'>Awesome Pricing Plan</h1>
            <h3 className='pb-4'>
                There are many variations of passages of Lorem Ipsum available <br/>  but the majority have suffered alteration in some form.
            </h3>
        </div>
        <div className='flex justify-center w-full mt-8 gap-16'>
            <div className='w-[20vw] duration-300 ease-in-out hover:scale-110 h-auto rounded-3xl py-4 px-16 shadow-2xl border-2'>
                <h2 className='text-lg font-bold mt-8'>Free</h2>
                <h3>$<span className='text-4xl font-bold'>00.00</span> Per Month</h3>
                <h2 className='text-lg font-bold mt-12 mb-4'>Features</h2>
                <h4>Up to 30 User</h4>
                <h4>All UI components</h4>
                <h4>Lifetime access</h4>
                <h4>Free updates</h4>
                <div className='my-16'>
                    <Boton>Purcharse Now</Boton>
                </div>
            </div>
            <div className='w-[20vw] duration-300 ease-in-out hover:scale-110 h-auto rounded-3xl py-4 px-16 shadow-2xl border-2'>
                <h2 className='text-lg font-bold mt-8'>Starter</h2>
                <h3>$<span className='text-4xl font-bold'>25.00</span> Per Month</h3>
                <h2 className='text-lg font-bold mt-12 mb-4'>Features</h2>
                <h4>Up to 50 User</h4>
                <h4>All UI components</h4>
                <h4>Lifetime access</h4>
                <h4>Free updates</h4>
                <div className='my-16'>
                    <Boton>Purcharse Now</Boton>
                </div>
            </div>
            <div className='w-[20vw] duration-300 ease-in-out hover:scale-110 bg-primaryColor text-white h-auto rounded-3xl py-4 px-16 shadow-2xl border-2 overflow-hidden relative'>
                <p
                    className='bg-white text-primaryColor p-2 absolute -rotate-90 pr-6 -right-14 font-bold top-10 rounded-lg'
                >
                    Recommended</p>
                <h2 className='text-lg font-bold mt-8'>Basic</h2>
                <h3>$<span className='text-4xl font-bold'>59.00</span> Per Month</h3>
                <h2 className='text-lg font-bold mt-12 mb-4'>Features</h2>
                <h4>Up to 100 User</h4>
                <h4>All UI components</h4>
                <h4>Lifetime access</h4>
                <h4>Free updates</h4>
                <div className='my-16'>
                    <Boton2>Purcharse Now</Boton2>
                </div>
            </div>
            <div className='w-[20vw] duration-300 ease-in-out hover:scale-110 h-auto rounded-3xl py-4 px-16 shadow-2xl border-2'>
                <h2 className='text-lg font-bold mt-8'>Premium</h2>
                <h3>$<span className='text-4xl font-bold'>99.00</span> Per Month</h3>
                <h2 className='text-lg font-bold mt-12 mb-4'>Features</h2>
                <h4>Up to more 100 User</h4>
                <h4>All UI components</h4>
                <h4>Lifetime access</h4>
                <h4>Free updates</h4>
                <div className='my-16'>
                    <Boton>Purcharse Now</Boton>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default PricingTable
