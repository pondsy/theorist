import React, {useEffect, useId, useState} from "react";
import styles from "../EditQuestionnaire/EditQuestionnaire.module.scss";
import {ReactComponent as Save} from "../../../../../resources/svgs/save.svg";
import sharedStyles from "../../../../../styles/shared.module.scss";
import {ReactComponent as Delete} from "../../../../../resources/svgs/delete.svg";
import {ReactComponent as Add} from "../../../../../resources/svgs/add.svg";
import MultiChoiceOption from "../MultiChoiceOption";
import {ReactComponent as Edit} from "../../../../../resources/svgs/edit.svg";
import {MultiChoice, Option, QuestionType} from "../../../../../store/practitioner/practitionerTypes";
import useValidation from "../../../../../hooks/useValidation";
import ErrorMessage from "../../../../../components/ErrorMessage";
import Button from "../../../../../components/Button";


interface Props {
    className: string;
    values?: MultiChoice;
    addQuestion: (form: MultiChoice) => void;
    removeQuestion: (id: string) => void;
}

const MultiChoiceQuestion = ({className, values, addQuestion, removeQuestion}: Props) => {

    const id = useId();
    const {validateTitle, validateOptions} = useValidation();
    const [form, setForm] = useState<MultiChoice>({
        id,
        title: '',
        type: QuestionType.multiChoice,
        options: []
    });
    const [addOption, setAddOption] = useState<boolean>();
    const [editOption, setEditOption] = useState<Option>();
    const [errors, setErrors] = useState<{title?: string, options?: string}>();

    useEffect(() => {
        if (values) setForm(values);
    }, [values])

    useEffect(() => {
        setAddOption(undefined);
        setEditOption(undefined);
    }, [form])

    const addToForm = () => {
        const errors = {
            title: validateTitle(form.title),
            options: validateOptions(form.options||[])
        };
        setErrors(errors);
        if (errors.title || errors.options) return;

        addQuestion(form)
    }

    useEffect(() => {
        if (!errors?.title && !errors?.options) return;
        const timeoutID = window.setTimeout(() => {
            setErrors(undefined)
        }, 3000);

        return () => window.clearTimeout(timeoutID);
    }, [errors]);

    return (
        <div key={form.id} className={className}>
            <label>Multi-choice question {form.id}</label>
            <div className={sharedStyles.inputWithButtons}>
                <input onKeyDown={(e) => e.key === 'Enter' && addToForm()} className={`${styles.input} ${errors?.title && sharedStyles.error}`} value={form?.title} onChange={(e)=> setForm((prev) => ({...prev, title: e.target.value}))}/>
                <span className={sharedStyles.inlineIconButtons}>
                    <Save onClick={addToForm}/>
                    <Delete onClick={() => removeQuestion(form.id)}/>
                </span>
            </div>
            {errors?.title && <ErrorMessage error={errors?.title}/>}

            {form.options && form.options.map((option, id) => (
                <div key={id} className={styles.inputWithButtons}>
                    {editOption?.id === option.id ?
                        <MultiChoiceOption
                            className={styles.labeledInput}
                            values={option}
                            save={addOption}
                            addAnswer={(answer) => setForm((prev) => {
                                return ({
                                    ...prev,
                                    options: prev.options?.map((o) => {
                                        if (o.id === answer.id) {
                                            return answer
                                        }
                                        return o;
                                    })
                                })
                            })}
                            removeAnswer={(id: string) => setForm((prev) => ({...prev, options: prev.options?.filter(q => q.id !== id)}))}
                        /> : option.answer}
                    {editOption?.id !== option.id && <span className={sharedStyles.inlineIconButtons}>
                        <Edit onClick={() => setEditOption(option)}/>
                        <Delete onClick={() => setForm((prev) => ({...prev, options: prev.options?.filter(q => q.id !== option.id)}))}/>
                    </span>}
                </div>
            ))}

            {errors?.options && <ErrorMessage error={errors?.options}/>}

            {addOption && <MultiChoiceOption
                className={`${styles.labeledInput} ${styles.indent}`}
                save={addOption}
                addAnswer={(answer) => setForm((prev) => ({...prev, options: prev.options?.concat(answer)}))}
                removeAnswer={(id: string) => setForm((prev) => ({...prev, options: prev.options?.filter(q => q.id !== id)}))}
            />}

            <Button icon={<Add/>} color='none' hoverColor="none" padding="5px 20px" text="option" onClick={() => setAddOption(true)}/>
        </div>
    )
}

export default MultiChoiceQuestion;