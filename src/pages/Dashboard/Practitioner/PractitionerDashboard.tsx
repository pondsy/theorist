import styles from './PractitionerDashboard.module.scss';
import PractitionerHeader from "../../../components/PractitionerHeader";
import Questionnaires from "../../../components/Questionnaires";
import Clients from "../../../components/Clients";
import Responses from "../../../components/Responses";
import {useState} from "react";

const PractitionerDashboard = () => {

    const [active, setActive] = useState<string>('Questionnaires');
    const components = {
        'Questionnaires': Questionnaires,
        'Clients': Clients,
        'Responses': Responses
    } as { [key: string]: () => JSX.Element };

    return (
        <div className={styles.page}>
            <PractitionerHeader setActive={setActive}/>
            {Object.keys(components).map((item: string, index: number) => {
                const Component = components[item];
                if (active === item) return <Component key={index}/>
            })}
        </div>
    )
}

export default PractitionerDashboard;