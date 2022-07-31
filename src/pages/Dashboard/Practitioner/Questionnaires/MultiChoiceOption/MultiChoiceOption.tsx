import React, {useEffect, useState} from "react";
import styles from "../EditQuestionnaire/EditQuestionnaire.module.scss";
import {ReactComponent as Save} from "../../../../../resources/svgs/save.svg";
import sharedStyles from "../../../../../styles/shared.module.scss";
import {ReactComponent as Delete} from "../../../../../resources/svgs/delete.svg";
import {Option} from "../../../../../store/practitioner/practitionerTypes";
import useValidation from "../../../../../hooks/useValidation";
import ErrorMessage from "../../../../../components/ErrorMessage";

interface Props {
    className: string;
    values: Option;
    save?: boolean;
    addAnswer: (form: Option) => void;
    removeAnswer: (id: string) => void;
}

const MultiChoiceOption = ({className, values, addAnswer, removeAnswer}: Props) => {

    const {validateQuestion} = useValidation();

    const [errors, setErrors] = useState<{answer?: string}>();
    const [form, setForm] = useState<Option>(values);

    useEffect(() => {
        if (values) setForm(values);
    }, [values])

    const addToForm = () => {
        const errors = {
            answer: validateQuestion(form.answer)
        };
        setErrors(errors);
        if (errors.answer) return;

        addAnswer(form)
    }

    useEffect(() => {
        if (!errors?.answer) return;
        const timeoutID = window.setTimeout(() => {
            setErrors(undefined)
        }, 3000);

        return () => window.clearTimeout(timeoutID);
    }, [errors]);

    return (
        <div key={form.id} className={className}>
            <label>Answer</label>
            <div className={sharedStyles.inputWithButtons}>
                <input onKeyDown={(e) => e.key === 'Enter' && addToForm()} className={`${styles.input} ${errors?.answer && sharedStyles.error}`} value={form?.answer} onChange={(e)=> setForm((prev) => ({...prev, answer: e.target.value}))}/>
                <span className={sharedStyles.inlineIconButtons}>
                    <Save onClick={() => addToForm()}/>
                    <Delete onClick={() => removeAnswer(form.id)}/>
                </span>
            </div>
            {errors?.answer && <ErrorMessage error={errors?.answer}/>}
        </div>
    )
}

export default MultiChoiceOption;