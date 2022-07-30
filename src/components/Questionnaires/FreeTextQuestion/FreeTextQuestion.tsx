import React, {useEffect, useId, useState} from "react";
import styles from "../EditQuestionnaire/EditQuestionnaire.module.scss";
import {QuestionType} from "../EditQuestionnaire/EditQuestionnaire";
import {ReactComponent as Save} from "../../../resources/svgs/save.svg";
import sharedStyles from "../../../styles/shared.module.scss";
import {ReactComponent as Delete} from "../../../resources/svgs/delete.svg";
import {Question} from "../Questionnaires";

export interface FreeText extends Question {
    answer?: string;
}

interface Props {
    className: string;
    values?: FreeText;
    addQuestion: (form: FreeText) => void;
    removeQuestion: (id: string) => void;
}

const FreeTextQuestion = ({className, values, addQuestion, removeQuestion}: Props) => {

    const id = useId();
    const [form, setForm] = useState<FreeText>({
        id,
        title: '',
        type: QuestionType.freeText,
        answer: ''
    });

    useEffect(() => {
        if (values) {
            setForm(values)
        }
    }, [values])

    return (
        <div key={form.id} className={className}>
            <label>Free text question {form.id}</label>
            <div className={sharedStyles.inputWithButtons}>
                <input className={styles.input} value={form?.title} onChange={(e)=> setForm((prev) => ({...prev, title: e.target.value}))}/>
                <span className={sharedStyles.inlineIconButtons}>
                    <Save onClick={() => addQuestion(form)}/>
                    <Delete onClick={() => removeQuestion(form.id)}/>
                </span>
            </div>

        </div>
    )
}

export default FreeTextQuestion;