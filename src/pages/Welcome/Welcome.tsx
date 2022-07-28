import styles from './Welcome.module.scss';
import Logo from "../../components/Logo";
import {useNavigate} from "react-router-dom";

const Welcome = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Logo/>
            <h1>THEORIST</h1>
            <h5>It's okay to not be okay</h5>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => navigate("login/practitioner")}>Practitioner</button>
                <button className={styles.button} onClick={() => navigate("login/patient")}>Patient</button>
            </div>
        </div>
    )
}

export default Welcome;