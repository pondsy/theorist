import React from 'react';
import styles from './Logo.module.scss';

const Logo = () => {
    return (
        <React.Fragment>
            <div className={styles.circle1}/>
            <div className={styles.circle2}/>
        </React.Fragment>
    )
}

export default Logo;