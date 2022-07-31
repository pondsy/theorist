import styles from "./Questionnaires.module.scss";
import React, {useState} from "react";
import {useAppSelector} from "../../../../store/store";
import QuestionnaireCard from "../QuestionnaireCard";
import Modal from "../../../../components/Modal";
import FillQuestionnaire from "./FillQuestionnaire";
import {ClientQuestionnaire} from "../../../../store/client/clientTypes";
import {useDispatch} from "react-redux";
import {saveClientAnswer} from "../../../../store/client/clientActions";

const Questionnaires = () => {

    const dispatch = useDispatch();

    const questionnaires = useAppSelector(state => state.client.questionnaires);

    const [active, setActive] = useState<ClientQuestionnaire>();

    const saveAnswer = (questionnaire: ClientQuestionnaire) => {
        dispatch(saveClientAnswer(questionnaire));
        setActive(undefined);
    }

    return (
        <div>
            <h2 className={styles.title}>Available questionnaires</h2>
            {questionnaires.map((q, id) => (
                <QuestionnaireCard key={id} questionnaire={q} open={(questionnaire) => setActive(questionnaire)}/>
            ))}

            {active && <Modal
                open={!!active}
                close={() => setActive(undefined)}
                className={styles.modal}
                content={
                    <FillQuestionnaire
                        close={() => setActive(undefined)}
                        fields={active}
                        saveQuestionnaire={(questionnaire) => saveAnswer(questionnaire)}
                    />
                }
            />}
        </div>
    )
}

export default Questionnaires;