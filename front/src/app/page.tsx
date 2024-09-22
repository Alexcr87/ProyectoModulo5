export default function Home() {
  return (
    <div className="bg-cuartiaryColor h-full flex justify-center">
      <div className="bg-white w-11/12 mt-4 rounded-t-2xl p-8 drop-shadow-2xl border-2">
        <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", textDecoration: "underline", marginBottom: "20px" }}>
          Bienvenido a la Plataforma de Votación
        </h1>
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", marginTop: "10px", marginBottom: "10px" }}>
          En nuestra plataforma, te ofrecemos una experiencia sencilla y accesible para gestionar tus elecciones y candidatos. Desde el momento en que ingresas, podrás registrar nuevos candidatos, ver la lista de aquellos que ya están registrados y participar en votaciones activas.
        </p>
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", marginTop: "10px", marginBottom: "10px" }}>
          Nuestra misión es facilitar el proceso de votación, asegurando que cada voz sea escuchada y cada voto cuente. Aquí encontrarás un entorno amigable donde podrás explorar propuestas, conocer a los candidatos y hacer tu elección informada.
        </p>
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", marginTop: "10px", marginBottom: "10px" }}>
          Mantente informado sobre las últimas noticias y anuncios relacionados con las votaciones. Te invitamos a registrarte como usuario y a participar activamente en el futuro de nuestra comunidad.
        </p>
      </div>
    </div>
  );
}
