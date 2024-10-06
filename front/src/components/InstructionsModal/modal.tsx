
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
            overlayClassName= {styles.modalOverlay} 
            ariaHideApp={false}
        >
            <h2>Sigue estos pasos:</h2>
            <br />
            <ul className={styles.lista}>
                <li>Inicia sesion</li>
                <br />
                <li>Dirigete a tu campaña</li>
                <br />
                <li>Selecciona tu candidato</li>
                <br />
                <li>Dale a "votar"</li>
                <br />
                <li>Tu sufragio fue emitido</li>
                <br />
                <li>Puedes cerrar sesion</li>
            </ul>
            <br />
            <button onClick={onRequestClose} className={styles.closeButton}>Cerrar</button>
        </Modal>
    );
};

export default CustomModal;



