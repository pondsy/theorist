import styles from './PractitionerDashboard.module.scss';
import PractitionerHeader from "../../../components/PractitionerHeader";
import Questionnaires from "../../../components/Questionnaires";
import Clients from "../../../components/Clients";
import Responses from "../../../components/Responses";
import {useEffect, useState} from "react";
import {getClients, getQuestionnaires} from "../../../store/practitioner/practitionerActions";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../store/store";
import {AuthState} from "../../../store/auth/authTypes";

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
            <PractitionerHeader setActivePage={setActive}/>
            {Object.keys(components).map((item: string, index: number) => {
                const Component = components[item];
                if (active === item) return <Component key={index}/>
            })}
        </div>
    )
}

export default PractitionerDashboard;