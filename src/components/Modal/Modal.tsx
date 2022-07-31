import styles from './Modal.module.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Motion from "../Motion/Motion";

export interface ModalProps {
    open: boolean;
    close?: () => void;
    className?: string;
    content: JSX.Element;
}

const Modal = ({open, className, content}: ModalProps) => {

    const modal = (
        <Motion>
            <div className={styles.backdrop}/>
            <div className={`${styles.wrapper} ${className}`}>
                <div className={styles.modal}>
                    <div className={styles.content}>{content}</div>
                </div>
            </div>
        </Motion>
    );
    return open ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;