import React, {useEffect, useState} from "react";
import {ReactComponent as Save} from "../../../../../resources/svgs/save.svg";
import sharedStyles from "../../../../../styles/shared.module.scss";
import {ReactComponent as Delete} from "../../../../../resources/svgs/delete.svg";
import {FreeText} from "../../../../../store/practitioner/practitionerTypes";
import useValidation from "../../../../../hooks/useValidation";
import ErrorMessage from "../../../../../components/ErrorMessage";


interface Props {
    className: string;
    values: FreeText;
    addQuestion: (form: FreeText) => void;
    removeQuestion: (id: string) => void;
}

const FreeTextQuestion = ({className, values, addQuestion, removeQuestion}: Props) => {

    const {validateQuestion} = useValidation();

    const [errors, setErrors] = useState<{ title?: string }>();
    const [form, setForm] = useState<FreeText>(values);

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
            <div className={sharedStyles.inputWithButtons}>
                <input placeholder="free-text question" onKeyDown={(e) => e.key === 'Enter' && addToForm()}
                       className={`${sharedStyles.input} ${errors?.title && sharedStyles.error}`} value={form?.title}
                       onChange={(e) => setForm((prev) => ({...prev, title: e.target.value}))}/>
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