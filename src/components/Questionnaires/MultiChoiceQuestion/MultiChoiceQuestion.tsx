import React, {useEffect, useId, useState} from "react";
import styles from "../EditQuestionnaire/EditQuestionnaire.module.scss";
import {QuestionType} from "../EditQuestionnaire/EditQuestionnaire";
import {ReactComponent as Save} from "../../../resources/svgs/save.svg";
import sharedStyles from "../../../styles/shared.module.scss";
import {ReactComponent as Delete} from "../../../resources/svgs/delete.svg";
import Button from "../../Button";
import {ReactComponent as Add} from "../../../resources/svgs/add.svg";
import {Option} from "../MultiChoiceOption/MultiChoiceOption";
import MultiChoiceOption from "../MultiChoiceOption";
import {ReactComponent as Edit} from "../../../resources/svgs/edit.svg";
import {Question} from "../Questionnaires";

export interface MultiChoice extends Question {
    options?: Option[]
}

interface Props {
    className: string;
    values?: MultiChoice;
    addQuestion: (form: MultiChoice) => void;
    removeQuestion: (id: string) => void;
}

const MultiChoiceQuestion = ({className, values, addQuestion, removeQuestion}: Props) => {

    const id = useId();
    const [form, setForm] = useState<MultiChoice>({
        id,
        title: '',
        type: QuestionType.multiChoice,
        options: []
    });
    const [addOption, setAddOption] = useState<boolean>();
    const [editOption, setEditOption] = useState<Option>();

    useEffect(() => {
        if (values) {
            setForm(values)
        }
    }, [values])

    useEffect(() => {
        setAddOption(undefined);
        setEditOption(undefined);
    }, [form])

    return (
        <div key={form.id} className={className}>
            <label>Multi-choice question {form.id}</label>
            <div className={sharedStyles.inputWithButtons}>
                <input className={styles.input} value={form?.title} onChange={(e)=> setForm((prev) => ({...prev, title: e.target.value}))}/>
                <span className={sharedStyles.inlineIconButtons}>
                    <Save onClick={() => addQuestion(form)}/>
                    <Delete onClick={() => removeQuestion(form.id)}/>
                </span>
            </div>

            {form.options && form.options.map((option, id) => (
                <div key={id} className={styles.inputWithButtons}>
                    {editOption?.id === option.id ?
                        <MultiChoiceOption
                            className={styles.labeledInput}
                            values={option}
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

            {addOption && <MultiChoiceOption
                className={`${styles.labeledInput} ${styles.indent}`}
                addAnswer={(answer) => setForm((prev) => ({...prev, options: prev.options?.concat(answer)}))}
                removeAnswer={(id: string) => setForm((prev) => ({...prev, options: prev.options?.filter(q => q.id !== id)}))}
            />}

            <Button icon={<Add/>} color='none' hoverColor="none" padding="5px 20px" text="option" onClick={() => setAddOption(true)}/>
        </div>
    )
}

export default MultiChoiceQuestion;