import styles from './ViewResponses.module.scss';
import sharedStyles from '../../styles/shared.module.scss';
import React from "react";
import {ReactComponent as Regard} from "../../resources/svgs/regard.svg";
import {ClientQuestionnaire} from "../../store/client/clientTypes";
import {Client, FreeText, MultiChoice, QuestionType} from "../../store/practitioner/practitionerTypes";
import Divider from "../Divider";

interface Props {
    close: () => void;
    fields: ClientQuestionnaire;
    client?: Client;
}

const ViewResponses = ({close, fields, client}: Props) => {

    return (
        <React.Fragment>

            <div className={styles.titleContainer}>
                <div className={styles.title}>
                    <h3>{fields.title}</h3>
                    {client && <h3>by {client.name}</h3>}
                </div>
                <Regard onClick={close}/>
            </div>

            <Divider/>

            <div className={sharedStyles.scrollArea}>
                {fields.questions?.map((question: FreeText | MultiChoice, id) => (
                        <React.Fragment key={id}>
                            <div className={styles.userAnswers}>
                                <div>
                                    <label className={styles.questionCount}>{id + 1}</label>
                                    <label>{question.title}</label>
                                </div>
                                <div>
                                    {question.type === QuestionType.freeText &&
                                        <div className={styles.answer}>{(question as FreeText).answer}</div>}
                                    {question.type === QuestionType.multiChoice && <div
                                        className={styles.answer}>{(question as MultiChoice).options.find((option) => option.selected)?.answer}</div>}
                                </div>
                            </div>
                        </React.Fragment>
                    )
                )}
            </div>

        </React.Fragment>
    )
}

export default ViewResponses;