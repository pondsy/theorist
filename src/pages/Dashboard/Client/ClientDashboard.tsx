import styles from "../Practitioner/PractitionerDashboard.module.scss";
import Header from "../../../components/Header";
import {useEffect, useState} from "react";
import Questionnaires from "../Client/Questionnaires";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../store/store";
import {AuthState} from "../../../store/auth/authTypes";
import {getQuestionnaires} from "../../../store/client/clientActions";

const ClientDashboard = () => {

    const dispatch = useDispatch();

    const auth = useAppSelector((state) => state.auth as Required<AuthState>);

    const [active, setActive] = useState<string>('Questionnaires');

    const components = {
        'Questionnaires': Questionnaires
    } as { [key: string]: () => JSX.Element };


    useEffect(() => {
        if (auth.data.questionnaire?.available.length) dispatch(getQuestionnaires(auth.data.questionnaire?.available, auth.user.uid));
    }, [dispatch])

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