const AboutUs = () => {
  return (
    <div className="bg-gray-100 p-6">
      <header className="bg-green-600 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">Sobre Nosotros</h1>
      </header>
      <section className="text-center mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestra Misión</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Somos un equipo comprometido en proporcionar una plataforma de votaciones segura, transparente y fácil de usar, donde cada usuario puede expresar su opinión de manera eficiente y confiable.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestros Valores</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Creamos soluciones tecnológicas que permiten tomar decisiones democráticas con integridad, promoviendo la participación activa de los ciudadanos.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contacto</h2>
        <p className="text-gray-600">
          Si tienes preguntas, no dudes en contactarnos a través de <a href="mailto:contacto@votaciones.com" className="text-blue-500 hover:underline">contacto@votaciones.com</a>.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
