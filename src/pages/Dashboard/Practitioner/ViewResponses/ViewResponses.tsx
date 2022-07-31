import styles from './ViewResponses.module.scss';
import {ClientQuestionnaire} from "../../../../store/client/clientTypes";
import Divider from "../../../../components/Divider";
import {Client, FreeText, MultiChoice, QuestionType} from "../../../../store/practitioner/practitionerTypes";
import React from "react";
import {ReactComponent as Regard} from "../../../../resources/svgs/regard.svg";

interface Props {
    close: () => void;
    fields: ClientQuestionnaire;
    client: Client;
}

const ViewResponses = ({close, fields, client}: Props) => {

    return (
        <React.Fragment>

            <div className={styles.title}>
                <h3>{fields.title} by {client.name}</h3>
                <Regard onClick={close}/>
            </div>

            <Divider/>

            <div className={styles.labeledInput}>
                {fields.questions?.map((question: FreeText | MultiChoice, id) => (
                    <React.Fragment>
                        <div key={id} className={styles.userAnswers}>
                            <div>
                                <label className={styles.questionCount}>{id + 1}</label>
                                <label>{question.title}</label>
                            </div>
                            <div>
                                {question.type === QuestionType.freeText && <div className={styles.answer}>{(question as FreeText).answer}</div>}
                                {question.type === QuestionType.multiChoice && <div className={styles.answer}>{(question as MultiChoice).options.find((o) => o.selected)!.answer}</div>}
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>

        </React.Fragment>
    )
}

export default ViewResponses;