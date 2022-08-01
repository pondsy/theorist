import styles from './Modal.module.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Motion from "../Motion/Motion";
import One from "../../resources/imgs/unsplash-1.jpg";
import Two from "../../resources/imgs/unsplash-2.jpg";
import Three from "../../resources/imgs/unsplash-3.jpg";
import Four from "../../resources/imgs/unsplash-4.jpg";
import Five from "../../resources/imgs/unsplash-5.jpg";

export interface ModalProps {
    open: boolean;
    close?: () => void;
    style?: React.CSSProperties;
    content: JSX.Element;
    image?: boolean;
}

const images = [One, Two, Three, Four, Five];

const Modal = ({open, style, image, content}: ModalProps) => {

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const modal = (
        <Motion>
            <div className={styles.backdrop}/>
            <div className={styles.wrapper} style={style}>
                <div className={styles.modal}
                     style={{...image ? {backgroundImage: `url(${randomImage})`} : {background: 'var(--color-primary)'}}}>
                    {image && <div className={styles.overlay}/>}
                    <div className={styles.content}>{content}</div>
                </div>
            </div>
        </Motion>
    );
    return open ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;