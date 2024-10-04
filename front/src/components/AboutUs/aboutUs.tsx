const AboutUs = () => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-zdjecie/wyborczyni-wkladajaca-kartke-do-urny-wyborczej-wybory-i-koncepcja-glosowania_77190-18358.jpg')",
      }}
    >
      {/* Overlay para oscurecer la imagen y mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center ">
        <header className="p-6">
          <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
        </header>
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="leading-relaxed mb-6">
            Somos un equipo comprometido en proporcionar una plataforma de votaciones segura, transparente y fácil de usar, donde cada usuario puede expresar su opinión de manera eficiente y confiable.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
          <p className="leading-relaxed mb-6">
            Creamos soluciones tecnológicas que permiten tomar decisiones democráticas con integridad, promoviendo la participación activa de los ciudadanos.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
          <p>
            Si tienes preguntas, no dudes en contactarnos a través de <a href="mailto:gestionelectoral2024m5@gmail.com" className="text-blue-500 hover:underline">gestionelectoral2024m5@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;