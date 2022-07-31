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
import useValidation from "../../../hooks/useValidation";
import ErrorMessage from "../../ErrorMessage";
import {FreeText} from "../FreeTextQuestion/FreeTextQuestion";
import {MultiChoice} from "../MultiChoiceQuestion/MultiChoiceQuestion";

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

    const {validateTitle, validateQuestions} = useValidation();
    const [questionnaire, setQuestionnaire] = useState<Questionnaire>({
        id: null,
        title: '',
        questions: [],
        added: ''
    });
    const [addQuestion, setAddQuestion] = useState<QuestionType>();
    const [editQuestion, setEditQuestion] = useState<Question>();
    const [errors, setErrors] = useState<{title?: string, questions?: string}>();

    const getQuestionOptions = (question: FreeText|MultiChoice) => {
        if (question.type === QuestionType.multiChoice) {
            return `(${(question as MultiChoice).options?.map((item) => item.answer).join(", ")})`;
        }
    }
    const save = () => {
        const errors = {
            title: validateTitle(questionnaire.title),
            questions: validateQuestions(questionnaire.questions)
        };
        setErrors(errors);
        if (errors.title || errors.questions) return;

        saveQuestionnaire({
            ...questionnaire,
            added: new Date().toISOString()
        })
    }

    useEffect(() => {
        setAddQuestion(undefined);
        setEditQuestion(undefined);
    }, [questionnaire.questions])

    useEffect(() => {
        if (fields) setQuestionnaire(fields);
    }, [fields])

    useEffect(() => {
        if (!errors?.title && !errors?.questions) return;
        const timeoutID = window.setTimeout(() => {
            setErrors(undefined)
        }, 3000);

        return () => window.clearTimeout(timeoutID);
    }, [errors]);

    return (
        <React.Fragment>

            <div className={styles.labeledInput}>
                <h3>Title</h3>
                <input className={`${styles.input} ${styles.title} ${errors?.title && sharedStyles.error}`} value={questionnaire.title} onChange={(e) => setQuestionnaire((prev) => ({...prev, title: e.target.value}))}/>
                {errors?.title && <ErrorMessage error={errors?.title}/>}
            </div>

            <Divider/>

            <div className={`${styles.labeledInput}  ${errors?.questions && sharedStyles.error}`}>
            <h3>Questions</h3>
                {questionnaire.questions?.map((question: FreeText|MultiChoice, id) => (
                    <React.Fragment>
                    <div key={id} className={styles.inputWithButtons}>
                        <label className={styles.questionCount}>{id+1}</label>
                        {editQuestion?.id === question.id ?
                            <React.Fragment>
                                {editQuestion.type === QuestionType.freeText ? <FreeTextQuestion
                                className={styles.labeledInput}
                                values={question}
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
                                    values={question}
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
                            </React.Fragment> : question.title}
                        {editQuestion?.id !== question.id && <span className={sharedStyles.inlineIconButtons}>
                            <Edit onClick={() => setEditQuestion(question)}/>
                            <Delete onClick={() => setQuestionnaire((prev) => ({...prev, questions: prev.questions.filter(q => q.id !== question.id)}))}/>
                        </span>}
                    </div>
                    {question.type === QuestionType.multiChoice && <div className={styles.questionOptions}>{getQuestionOptions(question)}</div>}
                    </React.Fragment>
                ))}
                {errors?.questions && <ErrorMessage error={errors?.questions}/>}
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
                <Button icon={<Add/>} color='none' hoverColor="none" padding={`5px ${questionnaire.questions.length ? '40px' : '20px'}`} text="free text"
                        onClick={() => setAddQuestion(QuestionType.freeText)}/>
                <Button icon={<Add/>} color='none' hoverColor="none" padding={`5px ${questionnaire.questions.length ? '40px' : '20px'}`} text="multi-choice"
                        onClick={() => setAddQuestion(QuestionType.multiChoice)}/>
            </React.Fragment>
            }

            {!addQuestion && <div className={styles.footerButtons}>
                <Button text="Save questionnaire" onClick={() => save()}/>
                <Button text="Close" onClick={close}/>
            </div>}

        </React.Fragment>
    )
}

export default EditQuestionnaire;