import styles from './PractitionerDashboard.module.scss';
import Questionnaires from "./Questionnaires";
import Clients from "./Clients";
import Responses from "./Responses";
import {useEffect, useState} from "react";
import {getClients, getQuestionnaires} from "../../../store/practitioner/practitionerActions";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../store/store";
import {AuthState} from "../../../store/auth/authTypes";
import Header from "../../../components/Header";

const PractitionerDashboard = () => {

    const dispatch = useDispatch();

    const auth = useAppSelector((state) => state.auth as Required<AuthState>);

    const [active, setActive] = useState<string>('Questionnaires');

    const components = {
        'Questionnaires': Questionnaires,
        'Clients': Clients,
        'Responses': Responses
    } as { [key: string]: () => JSX.Element };

    useEffect(() => {
        dispatch(getClients(auth.user.uid));
        dispatch(getQuestionnaires(auth.user.uid));
    }, [dispatch, auth.user.uid])

    return (
        <div className={styles.page}>
            <Header setActivePage={setActive} paths={["Questionnaires", "Clients", "Responses"]}/>
            {Object.keys(components).map((item: string, index: number) => {
                const Component = components[item];
                if (active === item) return <Component key={index}/>
            })}
        </div>
    )
}

export default PractitionerDashboard;