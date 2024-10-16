import React from 'react';
import Modal from 'react-modal';
import styles from "./styles.module.css";
import Link from 'next/link';

interface CustomModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    userRole: string | null;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, userRole }) => {
    // Contenido para votantes
    const voterGuideContent = (
        <>
            <h2>Sigue estos pasos:</h2>
            <br />
            <ul className={styles.lista}>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/login' className={styles.stepLink}>
                            <strong>Paso 1:</strong> <em>Inicia Sesión</em>
                        </Link>
                    </div>
                    - Ingresa con tu email y contraseña.
                </li>
                <br />
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/campaigns' className={styles.stepLink}>
                            <strong>Paso 2:</strong><em>Dirígete a tu campaña</em>
                        </Link>
                    </div>
                </li>
                <br />
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/' className={styles.stepLink}>
                            <strong>Paso 3:</strong><em>Selecciona tu candidato</em>
                        </Link>
                    </div>
                </li>
                <br />
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='campaigns' className={styles.stepLink}>
                            <strong>Paso 4:</strong><em>Dale a "votar"</em>
                        </Link>
                    </div>
                </li>
                <br />
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='campaigns' className={styles.stepLink}>
                            <strong>Paso 5:</strong><em>Tu sufragio fue emitido</em>
                        </Link>
                    </div>
                </li>
                <br />
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='campaigns' className={styles.stepLink}>
                            <strong>Paso 6:</strong><em>Puedes cerrar sesión</em>
                        </Link>
                    </div>
                </li>
            </ul>
            <br />
        </>
    );

    // Contenido para creadores de campañas
    const campaignGuideContent = (
        <>
            <h2>Bienvenido a Voting SYSTEM</h2>
            <p>¡Gracias por elegirnos! Aquí te mostramos cómo utilizar nuestra app para crear votaciones de manera sencilla y efectiva:</p>
            <br />
            <ul className={styles.lista}>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/registerUser' className={styles.stepLink}>
                            <strong>Paso 1:</strong> <em>Crea tu Cuenta</em>
                        </Link>
                    </div>
                    Regístrate con tu correo electrónico. Asegúrate de usar uno válido para la confirmación.
                </li>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/login' className={styles.stepLink}>
                            <strong>Paso 2:</strong> <em>Inicia Sesión</em>
                        </Link>
                    </div>
                    Una vez registrado, ingresa con tu email y contraseña.
                </li>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/groups' className={styles.stepLink}>
                            <strong>Paso 3:</strong> <em>Crea un Grupo</em>
                        </Link>
                    </div>
                    Forma un grupo de votantes. Por ejemplo, si estás organizando una votación para un evento, crea un grupo llamado "Asistentes al Evento". Este es el primer paso antes de lanzar tu campaña.
                </li>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/campaigns' className={styles.stepLink}>
                            <strong>Paso 4:</strong> <em>Asigna el Grupo a tu Campaña</em>
                        </Link>
                    </div>
                    Al crear una campaña, selecciona el grupo que participará. Por ejemplo, asigna "Asistentes al Evento" a tu campaña sobre la elección de actividades.
                </li>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/registerUsers' className={styles.stepLink}>
                            <strong>Paso 5:</strong> <em>Crea y Asigna Usuarios</em>
                        </Link>
                    </div>
                    Agrega usuarios a tu campaña. Puedes seleccionar que un usuario pertenezca a "Asistentes al Evento" o incluso a varios grupos. Esto te permitirá realizar campañas más amplias con muchos grupos o enfocarte en pequeños grupos específicos.
                </li>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/users' className={styles.stepLink}>
                            <strong>Paso 6:</strong> <em>Gestiona tus Usuarios</em>
                        </Link>
                    </div>
                    Con tus usuarios organizados en grupos, podrás gestionar de manera eficiente tanto campañas grandes como pequeñas. Por ejemplo, puedes hacer una votación para todo el evento o solo para un grupo selecto de participantes.
                </li>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/users' className={styles.stepLink}>
                            <strong>Paso 7:</strong> <em>Nombra a tus Candidatos</em>
                        </Link>
                    </div>
                    Desde la lista de usuarios, selecciona a los candidatos para la votación y proporciona sus datos y fotos.

                </li>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/campaigns' className={styles.stepLink}>
                            <strong>Paso 8:</strong> <em>Visualiza tus Campañas</em>
                        </Link>
                    </div>
                    En "Mis Campañas", podrás ver todas las campañas creadas, junto con las opciones de <strong>Actualizar</strong> o <strong>Ver</strong> los detalles de cada una.
                </li>
                <li>
                    <div onClick={onRequestClose}>
                        <Link href='/results' className={styles.stepLink}>
                            <strong>Paso 9:</strong> <em>Consulta los Resultados</em>
                        </Link>
                    </div>
                    Accede a los resultados de cada campaña seleccionada desde la pestaña de resultados para ver quién ganó.
                </li>
            </ul>
            <h3>¡Gracias por elegirnos!</h3>
            <p>Tu participación es clave para construir comunidades más fuertes y comprometidas. ¡Empieza a votar y haz que tu voz cuente hoy!</p>
            <br />
        </>
    );

    // Determina el contenido del modal basado en el rol del usuario
    const modalContent = (!userRole || userRole === 'admin' || userRole === 'moderator') 
        ? campaignGuideContent 
        : voterGuideContent;

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay} 
            ariaHideApp={true}
        >
            <div className={styles.modalInner}>
                {modalContent}
                <button onClick={onRequestClose} className={styles.closeButton}>Cerrar</button>
            </div>
        </Modal>
    );
};

export default CustomModal;
