import React, {useEffect, useState} from "react";
import styles from './EditQuestionnaire.module.scss';
import {ReactComponent as Add} from "../../../../../resources/svgs/add.svg";
import sharedStyles from "../../../../../styles/shared.module.scss";
import FreeTextQuestion from "../FreeTextQuestion";
import {ReactComponent as Edit} from "../../../../../resources/svgs/edit.svg";
import {ReactComponent as Delete} from "../../../../../resources/svgs/delete.svg";
import MultiChoiceQuestion from "../MultiChoiceQuestion";
import {
    FreeText,
    MultiChoice,
    Question,
    Questionnaire,
    QuestionType
} from "../../../../../store/practitioner/practitionerTypes";
import useValidation from "../../../../../hooks/useValidation";
import ErrorMessage from "../../../../../components/ErrorMessage";
import Button from "../../../../../components/Button";
import {v4 as uuid} from "uuid";


interface Props {
    close: () => void;
    fields?: Questionnaire;
    saveQuestionnaire: (fields: Questionnaire) => void;
}

const EditQuestionnaire = ({close, fields, saveQuestionnaire}: Props) => {

    const {validateTitle, validateQuestions} = useValidation();
    const [questionnaire, setQuestionnaire] = useState<Questionnaire>({
        title: '',
        questions: [],
        added: ''
    });
    const [addQuestion, setAddQuestion] = useState<QuestionType>();
    const [editQuestion, setEditQuestion] = useState<Question>();
    const [errors, setErrors] = useState<{ title?: string, questions?: string }>();

    const getQuestionOptions = (question: FreeText | MultiChoice) => {
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
            added: questionnaire.added || new Date().toISOString()
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

            <div className={sharedStyles.labeledInput}>
                <input placeholder="Title"
                       className={`${sharedStyles.input} ${styles.title} ${errors?.title && sharedStyles.error}`}
                       value={questionnaire.title}
                       onChange={(e) => setQuestionnaire((prev) => ({...prev, title: e.target.value}))}/>
                {errors?.title && <ErrorMessage error={errors?.title}/>}
            </div>

            <br/>

            <div className={`${sharedStyles.labeledInput}  ${errors?.questions && sharedStyles.error}`}>
                {questionnaire.questions?.map((question: FreeText | MultiChoice, id) => (
                    <React.Fragment key={id}>
                        <div className={sharedStyles.textWithButtons}>
                            <label className={styles.questionCount}>{id + 1}</label>
                            {editQuestion?.id === question.id ?
                                <React.Fragment>
                                    {editQuestion.type === QuestionType.freeText ? <FreeTextQuestion
                                        className={sharedStyles.labeledInput}
                                        values={question as FreeText}
                                        addQuestion={(question) => setQuestionnaire((prev) => ({
                                            ...prev,
                                            questions: prev.questions.map((q) => {
                                                if (q.id === question.id) {
                                                    return question
                                                }
                                                return q;
                                            })
                                        }))}
                                        removeQuestion={(id: string) => setQuestionnaire((prev) => ({
                                            ...prev,
                                            questions: prev.questions.filter(q => q.id !== id)
                                        }))}
                                    /> : <MultiChoiceQuestion
                                        className={sharedStyles.labeledInput}
                                        values={question as MultiChoice}
                                        addQuestion={(question) => setQuestionnaire((prev) => ({
                                            ...prev,
                                            questions: prev.questions.map((q) => {
                                                if (q.id === question.id) {
                                                    return question
                                                }
                                                return q;
                                            })
                                        }))}
                                        removeQuestion={(id: string) => setQuestionnaire((prev) => ({
                                            ...prev,
                                            questions: prev.questions.filter(q => q.id !== id)
                                        }))}/>}
                                </React.Fragment> : question.title}
                            {editQuestion?.id !== question.id && <span className={sharedStyles.inlineIconButtons}>
                            <Edit onClick={() => setEditQuestion(question)}/>
                            <Delete onClick={() => setQuestionnaire((prev) => ({
                                ...prev,
                                questions: prev.questions.filter(q => q.id !== question.id)
                            }))}/>
                        </span>}
                        </div>
                        {question.type === QuestionType.multiChoice && editQuestion?.id !== question.id &&
                            <div className={styles.questionOptions}>{getQuestionOptions(question)}</div>}
                    </React.Fragment>
                ))}
                {errors?.questions && <ErrorMessage error={errors?.questions}/>}
            </div>

            {addQuestion === QuestionType.freeText && <FreeTextQuestion
                className={`${sharedStyles.labeledInput} ${sharedStyles.indent}`}
                values={{id: uuid(), title: '', type: QuestionType.freeText, answer: ''}}
                addQuestion={(question) => setQuestionnaire((prev) => ({
                    ...prev,
                    questions: [...prev.questions, question]
                }))}
                removeQuestion={(id: string) => setQuestionnaire((prev) => ({
                    ...prev,
                    questions: prev.questions.filter(q => q.id !== id)
                }))}
            />}

            {addQuestion === QuestionType.multiChoice && <MultiChoiceQuestion
                className={`${sharedStyles.labeledInput} ${sharedStyles.indent}`}
                values={{id: uuid(), title: '', type: QuestionType.multiChoice, options: []}}
                addQuestion={(question) => setQuestionnaire((prev) => ({
                    ...prev,
                    questions: [...prev.questions, question]
                }))}
                removeQuestion={(id: string) => setQuestionnaire((prev) => ({
                    ...prev,
                    questions: prev.questions.filter(q => q.id !== id)
                }))}
            />}

            {!addQuestion && !editQuestion && <div className={sharedStyles.addQuestion}>
                <Button icon={<Add/>} color='none' hoverColor="none"
                        padding={`5px ${questionnaire.questions.length ? '50px' : '20px'}`} text="free-text question"
                        onClick={() => setAddQuestion(QuestionType.freeText)}/>
                <Button icon={<Add/>} color='none' hoverColor="none"
                        padding={`5px ${questionnaire.questions.length ? '50px' : '20px'}`} text="multi-choice question"
                        onClick={() => setAddQuestion(QuestionType.multiChoice)}/>
            </div>
            }

            {!addQuestion && <div className={sharedStyles.footerButtons}>
                <Button text="Save questionnaire" onClick={() => save()}/>
                <Button text="Close" onClick={close}/>
            </div>}

        </React.Fragment>
    )
}

export default EditQuestionnaire;