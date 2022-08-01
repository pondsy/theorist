import React, {useEffect, useId, useState} from "react";
import sharedStyles from "../../../../../styles/shared.module.scss";
import {FreeText, QuestionType} from "../../../../../store/practitioner/practitionerTypes";
import useValidation from "../../../../../hooks/useValidation";
import ErrorMessage from "../../../../../components/ErrorMessage";
import {ReactComponent as Back} from "../../../../../resources/svgs/back.svg";
import {ReactComponent as Next} from "../../../../../resources/svgs/next.svg";
import Button from "../../../../../components/Button";
import styles from "../FreeTextAnswer/FreeTextAnswer.module.scss";


interface Props {
    className: string;
    values?: FreeText;
    index: number;
    length: number;
    addAnswer: (form: FreeText, final: boolean) => void;
    goBack: (index: number) => void;
}

const FreeTextAnswer = ({className, values, index, length, addAnswer, goBack}: Props) => {

    const id = useId();
    const {validateAnswer} = useValidation();

    const [errors, setErrors] = useState<{ answer?: string }>();
    const [form, setForm] = useState<FreeText>({
        id,
        title: '',
        type: QuestionType.freeText,
        answer: ''
    });

    useEffect(() => {
        if (values) setForm(values);
    }, [values])

    const addToForm = (final: boolean = false) => {
        const errors = {
            answer: validateAnswer(form?.answer || '')
        };
        setErrors(errors);
        if (errors.answer) return;

        addAnswer(form, final)
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
            <label>{form.title}</label>
            <div>Question {index + 1}/{length}</div>

            <textarea
                name={`question-${form.id}`}
                rows={4}
                cols={50}
                onKeyDown={(e) => e.key === 'Enter' && addToForm()}
                value={form?.answer}
                className={sharedStyles.textArea}
                onChange={(e) => setForm((prev) => ({...prev, answer: e.target.value}))}
            />
            {errors?.answer && <ErrorMessage error={errors?.answer}/>}

            {<div className={sharedStyles.footerNav}>
                {index !== 0 && <Back style={{marginRight: 'auto'}} onClick={() => goBack(index - 1)}/>}
                {index !== length - 1 &&
                    <Next className={`${!form.answer ? sharedStyles.disabled : ''}`} style={{marginLeft: 'auto'}}
                          onClick={() => form.answer && addToForm()}/>}
                {index === length - 1 && <Button disabled={!form.answer} style={{marginLeft: 'auto'}} text={'Save'}
                                                 onClick={() => addToForm(true)}/>}
            </div>}
        </div>
    )
}

export default FreeTextAnswer;