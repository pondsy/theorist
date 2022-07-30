import styles from './Welcome.module.scss';
import {ReactComponent as Circle} from "../../resources/svgs/circle.svg";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import React from "react";

const Welcome = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <Circle className={styles.logo}/>
            <h1>THEORIST</h1>
            <h5>It's okay to not be okay</h5>
            <div className={styles.buttonContainer}>
                <Button text="Practitioner" onClick={() => navigate("login", {state: {role: 'practitioner'}})}/>
                <Button text="Client" onClick={() => navigate("login", {state: {role: 'client'}})}/>
            </div>
        </div>
    )
}

export default Welcome;