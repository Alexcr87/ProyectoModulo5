import React from 'react'
import Link from 'next/link'

const Inicial = () => {
  return (
    <div className="relative w-full bg-cover bg-center h-[90vh]" style={{ backgroundImage: "url('https://img.freepik.com/premium-zdjecie/wyborczyni-wkladajaca-kartke-do-urny-wyborczej-wybory-i-koncepcja-glosowania_77190-18358.jpg')" }}>
      {/* Overlay para oscurecer la imagen y mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 className="text-4xl font-bold mb-6">
          Bienvenido a la Plataforma de Votación
        </h1>
        <p className="text-lg mb-2">
          Nuestra plataforma ofrece una experiencia intuitiva y accesible para que puedas gestionar elecciones de manera eficiente.
        </p>
        <p className="text-lg mb-6">
          Explora los candidatos, participa en votaciones y mantente al tanto de los resultados, todo desde una única plataforma.
        </p>
        <Link href="/guia">
        <button className="bg-primaryColor text-white px-6 py-3 rounded-md shadow-md hover:bg-tertiaryColor transition duration-300">
        Guía de votación
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Inicial