import React from "react";
import styles from './ProgressBar.module.scss';

interface Props {
    completed: number
}

const ProgressBar = ({completed}: Props) => {

    return (
        <div className={styles.container}>
            <div className={styles.filler} style={{width: `${completed}%`}}/>
        </div>
    );
};

export default ProgressBar;