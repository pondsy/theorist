import styles from './Welcome.module.scss';
import sharedStyles from '../../styles/shared.module.scss';
import {ReactComponent as Circle} from "../../resources/svgs/circle.svg";
import {useNavigate} from "react-router-dom";

const Welcome = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Circle className={styles.logo}/>
            <h1>THEORIST</h1>
            <h5>It's okay to not be okay</h5>
            <div className={styles.buttonContainer}>
                <button className={sharedStyles.button} onClick={() => navigate("login", {state: {role: 'practitioner'}})}>Practitioner</button>
                <button className={sharedStyles.button} onClick={() => navigate("login", {state: {role: 'client'}})}>Client</button>
            </div>
        </div>
    )
}

export default Welcome;