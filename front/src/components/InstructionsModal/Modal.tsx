import React from 'react';
import Modal from 'react-modal';
import styles from "./styles.module.css";

interface CustomModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose }) => {


    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay} 
            ariaHideApp={false}
        >
            <div className={styles.modalInner}>
            <h2>Bienvenido a Voting SYSTEM</h2>
            <p>¡Gracias por elegirnos! Aquí te mostramos cómo utilizar nuestra app para crear votaciones de manera sencilla y efectiva:</p>
            <br />
            <ul className={styles.lista}>
                <li><strong>Paso 1:</strong> <em>Crea tu Cuenta</em> - Regístrate con tu correo electrónico. Asegúrate de usar uno válido para la confirmación.</li>
                
                <li><strong>Paso 2:</strong> <em>Inicia Sesión</em> - Una vez registrado, ingresa con tu email y contraseña.</li>
                
                <li><strong>Paso 3:</strong> <em>Crea un Grupo</em> - Forma un grupo de votantes. Por ejemplo, si estás organizando una votación para un evento, crea un grupo llamado "Asistentes al Evento". Este es el primer paso antes de lanzar tu campaña.</li>
                
                <li><strong>Paso 4:</strong> <em>Asigna el Grupo a tu Campaña</em> - Al crear una campaña, selecciona el grupo que participará. Por ejemplo, asigna "Asistentes al Evento" a tu campaña sobre la elección de actividades.</li>
                
                <li><strong>Paso 5:</strong> <em>Crea y Asigna Usuarios</em> - Agrega usuarios a tu campaña. Puedes seleccionar que un usuario pertenezca a "Asistentes al Evento" o incluso a varios grupos. Esto te permitirá realizar campañas más amplias con muchos grupos o enfocarte en pequeños grupos específicos.</li>
                
                <li><strong>Paso 6:</strong> <em>Gestiona tus Usuarios</em> - Con tus usuarios organizados en grupos, podrás gestionar de manera eficiente tanto campañas grandes como pequeñas. Por ejemplo, puedes hacer una votación para todo el evento o solo para un grupo selecto de participantes.</li>
                
                <li><strong>Paso 7:</strong> <em>Nombra a tus Candidatos</em> - Desde la lista de usuarios, selecciona a los candidatos para la votación y proporciona sus datos y fotos.</li>
                
                <li><strong>Paso 8:</strong> <em>Visualiza tus Campañas</em> - En "Mis Campañas", podrás ver todas las campañas creadas, junto con las opciones de <strong>Actualizar</strong> o <strong>Ver</strong> los detalles de cada una.</li>
                
                <li><strong>Paso 9:</strong> <em>Consulta los Resultados</em> - Accede a los resultados de cada campaña seleccionada desde la pestaña de resultados para ver quién ganó.</li>
            </ul>
            <h3>¡Gracias por elegirnos!</h3>
            <p>Tu participación es clave para construir comunidades más fuertes y comprometidas. ¡Empieza a votar y haz que tu voz cuente hoy!</p>
            <br />
            <button onClick={onRequestClose} className={styles.closeButton}>Cerrar</button>
        </div>
    </Modal>
    );    
}    

export default CustomModal;