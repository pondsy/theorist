import styles from "./Questionnaires.module.scss";
import sharedStyles from '../../../../styles/shared.module.scss';
import React, {useMemo, useState} from "react";
import {useAppSelector} from "../../../../store/store";
import QuestionnaireCard from "./QuestionnaireCard";
import Modal from "../../../../components/Modal";
import FillQuestionnaire from "./FillQuestionnaire";
import {ClientQuestionnaire} from "../../../../store/client/clientTypes";
import {useDispatch} from "react-redux";
import {saveClientAnswer} from "../../../../store/client/clientActions";
import ResponseCard from "../../Practitioner/Responses/ResponseCard";
import ViewResponses from "../../../../components/ViewResponses";

const Questionnaires = () => {

    const dispatch = useDispatch();

    const questionnaires = useAppSelector(state => state.client.questionnaires);
    const answers = useAppSelector(state => state.client.answers);
    const answerIds = answers.map((answer) => answer.questionnaireId);

    const available = useMemo(() => {
        return questionnaires.filter((item) => !answerIds.includes(item.questionnaireId))
    }, [answerIds, questionnaires]);

    const [create, setCreate] = useState<ClientQuestionnaire>();
    const [view, setView] = useState<ClientQuestionnaire>();

    const saveAnswer = (questionnaire: ClientQuestionnaire) => {
        dispatch(saveClientAnswer(questionnaire));
        setCreate(undefined);
    }


    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2 className={styles.title}>Available questionnaires</h2>
                {available.map((q, id) => (
                    <QuestionnaireCard key={id} questionnaire={q} open={(questionnaire) => setCreate(questionnaire)}/>
                ))}
                {!available.length && <div className={sharedStyles.message}>
                    You don't have any available questionnaire.
                </div>}
            </div>

            <div className={styles.container}>
                <h2 className={styles.title}>Previously filled in</h2>
                {answers.map((a, id) => (
                    <ResponseCard key={id} response={a} open={(questionnaire) => setView(questionnaire)}/>
                ))}

                {!answers.length && <div className={sharedStyles.message}>
                    You haven't filled in any questionnaires yet.
                </div>}
            </div>

            {create && <Modal
                open={!!create}
                close={() => setCreate(undefined)}
                content={
                    <FillQuestionnaire
                        close={() => setCreate(undefined)}
                        fields={create}
                        saveQuestionnaire={(questionnaire) => saveAnswer(questionnaire)}
                    />
                }
            />}

            {view && <Modal
                open={!!view}
                close={() => setView(undefined)}
                content={
                    <ViewResponses
                        close={() => setView(undefined)}
                        fields={view}
                    />
                }
            />}
        </div>
    )
}

export default Questionnaires;