import React, {useEffect, useState} from "react";
import styles from './EditQuestionnaire.module.scss';
import {ReactComponent as Add} from "../../../resources/svgs/add.svg";
import sharedStyles from "../../../styles/shared.module.scss";
import FreeTextQuestion from "../FreeTextQuestion";
import {ReactComponent as Edit} from "../../../resources/svgs/edit.svg";
import {ReactComponent as Delete} from "../../../resources/svgs/delete.svg";
import Divider from "../../Divider";
import Button from "../../Button";
import MultiChoiceQuestion from "../MultiChoiceQuestion";
import {Question, Questionnaire} from "../Questionnaires";

export enum QuestionType {
    multiChoice = 'multiChoice',
    freeText = 'freeText'
}

interface Props {
    close: () => void;
    fields?: Questionnaire;
    saveQuestionnaire: (fields: Questionnaire) => void;
}

const EditQuestionnaire = ({close, fields, saveQuestionnaire}: Props) => {

    const [questionnaire, setQuestionnaire] = useState<Questionnaire>({
        id: null,
        title: '',
        questions: [],
        added: '',
        clients: [],
        filledIn: []
    });
    const [addQuestion, setAddQuestion] = useState<QuestionType>();
    const [editQuestion, setEditQuestion] = useState<Question>()

    useEffect(() => {
        setAddQuestion(undefined);
        setEditQuestion(undefined);
    }, [questionnaire.questions])

    useEffect(() => {
        if (fields) setQuestionnaire(fields);
    }, [fields])

    return (
        <React.Fragment>

            <div className={styles.labeledInput}>
                <h3>Title</h3>
                <input className={`${styles.input} ${styles.title}`} value={questionnaire.title} onChange={(e) => setQuestionnaire((prev) => ({...prev, title: e.target.value}))}/>
            </div>

            <Divider/>

            <div className={styles.labeledInput}>
            <h3>Questions</h3>
                {questionnaire.questions?.map((field, id) => (
                    <div key={id} className={styles.inputWithButtons}>
                        <label className={styles.questionCount}>{id+1}</label>
                        {editQuestion?.id === field.id ?
                            <React.Fragment>
                                {editQuestion.type === QuestionType.freeText ? <FreeTextQuestion
                                className={styles.labeledInput}
                                values={field}
                                addQuestion={(question) => setQuestionnaire((prev) => ({
                                    ...prev,
                                    questions: prev.questions.map((q) => {
                                        if (q.id === question.id) {
                                            return question
                                        }
                                        return q;
                                    })}))}
                                removeQuestion={(id: string) => setQuestionnaire((prev) => ({...prev, questions: prev.questions.filter(q => q.id !== id)}))}
                            /> : <MultiChoiceQuestion
                                    className={styles.labeledInput}
                                    values={field}
                                    addQuestion={(question) => setQuestionnaire((prev) => ({
                                        ...prev,
                                        questions: prev.questions.map((q) => {
                                            if (q.id === question.id) {
                                                return question
                                            }
                                            return q;
                                        })
                                    }))}
                                    removeQuestion={(id: string) => setQuestionnaire((prev) => ({...prev, questions: prev.questions.filter(q => q.id !== id)}))}/>}
                            </React.Fragment> : field.title}
                        {editQuestion?.id !== field.id && <span className={sharedStyles.inlineIconButtons}>
                            <Edit onClick={() => setEditQuestion(field)}/>
                            <Delete onClick={() => setQuestionnaire((prev) => ({...prev, questions: prev.questions.filter(q => q.id !== field.id)}))}/>
                        </span>}
                    </div>
                ))}
            </div>

            {addQuestion === QuestionType.freeText && <FreeTextQuestion
                className={styles.labeledInput}
                addQuestion={(question) => setQuestionnaire((prev) => ({...prev, questions: [...prev.questions, question]}))}
                removeQuestion={(id: string) => setQuestionnaire((prev) => ({...prev, questions: prev.questions.filter(q => q.id !== id)}))}
            />}

            {addQuestion === QuestionType.multiChoice && <MultiChoiceQuestion
                className={styles.labeledInput}
                addQuestion={(question) => setQuestionnaire((prev) => ({...prev, questions: [...prev.questions, question]}))}
                removeQuestion={(id: string) => setQuestionnaire((prev) => ({...prev, questions: prev.questions.filter(q => q.id !== id)}))}
            />}

            {!addQuestion && !editQuestion && <React.Fragment>
                <Button icon={<Add/>} color='none' hoverColor="none" padding="5px 40px" text="free text"
                        onClick={() => setAddQuestion(QuestionType.freeText)}/>
                <Button icon={<Add/>} color='none' hoverColor="none" padding="5px 40px" text="multi-choice"
                        onClick={() => setAddQuestion(QuestionType.multiChoice)}/>
            </React.Fragment>
            }

            {!addQuestion && <div className={styles.footerButtons}>
                <Button text="Save questionnaire" onClick={() => saveQuestionnaire({
                    ...questionnaire,
                    added: new Date().toISOString()
                })}/>
                <Button text="Close" onClick={close}/>
            </div>}

        </React.Fragment>
    )
}

export default EditQuestionnaire;