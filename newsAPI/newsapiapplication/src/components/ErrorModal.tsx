import React from 'react';

interface ErrorModalProps {
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Ошибка</h2>
                <p>{message}</p>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default ErrorModal;
