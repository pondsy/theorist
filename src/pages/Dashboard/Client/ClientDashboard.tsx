import styles from "../Practitioner/PractitionerDashboard.module.scss";
import Header from "../../../components/Header";
import {useState} from "react";
import Questionnaires from "../Client/Questionnaires";

const ClientDashboard = () => {

    const [active, setActive] = useState<string>('Questionnaires');

    const components = {
        'Questionnaires': Questionnaires
    } as { [key: string]: () => JSX.Element };

    return (
        <div className={styles.page}>
            <Header setActivePage={setActive} paths={["Questionnaires"]}/>
            {Object.keys(components).map((item: string, index: number) => {
                const Component = components[item];
                if (active === item) return <Component key={index}/>
            })}
        </div>
    )
}

export default ClientDashboard;