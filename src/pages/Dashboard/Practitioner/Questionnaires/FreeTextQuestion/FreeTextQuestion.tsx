import React, {useEffect, useId, useState} from "react";
import styles from "../EditQuestionnaire/EditQuestionnaire.module.scss";
import {ReactComponent as Save} from "../../../../../resources/svgs/save.svg";
import sharedStyles from "../../../../../styles/shared.module.scss";
import {ReactComponent as Delete} from "../../../../../resources/svgs/delete.svg";
import {FreeText, QuestionType} from "../../../../../store/practitioner/practitionerTypes";
import useValidation from "../../../../../hooks/useValidation";
import ErrorMessage from "../../../../../components/ErrorMessage";


interface Props {
    className: string;
    values?: FreeText;
    addQuestion: (form: FreeText) => void;
    removeQuestion: (id: string) => void;
}

const FreeTextQuestion = ({className, values, addQuestion, removeQuestion}: Props) => {

    const id = useId();
    const {validateQuestion} = useValidation();

    const [errors, setErrors] = useState<{title?: string}>();
    const [form, setForm] = useState<FreeText>({
        id,
        title: '',
        type: QuestionType.freeText,
        answer: ''
    });

    useEffect(() => {
        if (values) setForm(values);
    }, [values])

    const addToForm = () => {
        const errors = {
            title: validateQuestion(form.title)
        };
        setErrors(errors);
        if (errors.title) return;

        addQuestion(form)
    }

    useEffect(() => {
        if (!errors?.title) return;
        const timeoutID = window.setTimeout(() => {
            setErrors(undefined)
        }, 3000);

        return () => window.clearTimeout(timeoutID);
    }, [errors]);

    return (
        <div key={form.id} className={className}>
            <label>Free text question {form.id}</label>
            <div className={sharedStyles.inputWithButtons}>
                <input onKeyDown={(e) => e.key === 'Enter' && addToForm()} className={`${styles.input} ${errors?.title && sharedStyles.error}`} value={form?.title} onChange={(e)=> setForm((prev) => ({...prev, title: e.target.value}))}/>
                <span className={sharedStyles.inlineIconButtons}>
                    <Save onClick={() => addToForm()}/>
                    <Delete onClick={() => removeQuestion(form.id)}/>
                </span>
            </div>
            {errors?.title && <ErrorMessage error={errors?.title}/>}
        </div>
    )
}

export default FreeTextQuestion;