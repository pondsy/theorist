import React, {useEffect, useState} from "react";
import styles from './FillQuestionnaire.module.scss';
import {
    FreeText,
    MultiChoice,
    Question,
    QuestionType
} from "../../../../../store/practitioner/practitionerTypes";
import FreeTextAnswer from "../FreeTextAnswer";
import MultiChoiceAnswer from "../MultiChoiceAnswer";
import ProgressBar from "../../../../../components/ProgressBar";
import {ClientQuestionnaire} from "../../../../../store/client/clientTypes";

interface Props {
    close: () => void;
    fields?: ClientQuestionnaire;
    saveQuestionnaire: (fields: ClientQuestionnaire) => void;
}

const FillQuestionnaire = ({close, fields, saveQuestionnaire}: Props) => {

    const [errors, setErrors] = useState<{title?: string, questions?: string}>();
    const [active, setActive] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>(fields?.questions || []);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if (fields) {
            setQuestions(fields.questions);
            setActive(0);
        }
    }, [fields])

    useEffect(() => {
        if (!errors?.title && !errors?.questions) return;
        const timeoutID = window.setTimeout(() => {
            setErrors(undefined)
        }, 3000);

        return () => window.clearTimeout(timeoutID);
    }, [errors]);

    const components = {
        [QuestionType.freeText]: FreeTextAnswer,
        [QuestionType.multiChoice]: MultiChoiceAnswer
    };

    const submitAnswer = (answer: MultiChoice|FreeText, index: number, final: boolean) => {
        setQuestions((prev) => {
            const exist = prev.find((a) => a.id === answer.id);
            if (exist) {
                return prev.map((a) => {
                    if (a.id === answer.id) {
                        return answer
                    } else {
                        return a
                    }
                })
            }

            return ([...prev.concat(answer)])
        });

        if (final) {
            setReady(true);
        } else {
            setActive(index+1);
        }
    }

    useEffect(() => {
        if (ready) {
            const updated: ClientQuestionnaire = {
                ...fields,
                questions
            } as ClientQuestionnaire;

            saveQuestionnaire(updated);
        }

    }, [fields, ready, questions])

    return (
        <React.Fragment>

            <div className={styles.labeledInput}>
                <h3>{fields?.title}</h3>
            </div>

            <ProgressBar completed={(active/questions.length)*100 || 0}/>

            {questions.map((item, index: number) => {
                const Component = components[item.type];
                if (active === index) return <Component
                    index={index}
                    length={questions.length}
                    className={styles.question}
                    values={item as any}
                    addAnswer={(answer, final) => submitAnswer(answer, index, final)}
                    goBack={(i) => setActive(i)}
                    key={index}
                />
            })}

        </React.Fragment>
    )
}

export default FillQuestionnaire;