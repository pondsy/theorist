import React, {useEffect, useId, useState} from "react";
import styles from "../EditQuestionnaire/EditQuestionnaire.module.scss";
import {ReactComponent as Save} from "../../../resources/svgs/save.svg";
import sharedStyles from "../../../styles/shared.module.scss";
import {ReactComponent as Delete} from "../../../resources/svgs/delete.svg";

export interface Option {
    id: string;
    answer: string;
    selected: boolean;
}
interface Props {
    className: string;
    values?: Option;
    addAnswer: (form: Option) => void;
    removeAnswer: (id: string) => void;
}

const MultiChoiceOption = ({className, values, addAnswer, removeAnswer}: Props) => {

    const id = useId();
    const [form, setForm] = useState<Option>({
        id,
        answer: '',
        selected: false
    });

    useEffect(() => {
        if (values) {
            setForm(values)
        }
    }, [values])

    return (
        <div key={form.id} className={className}>
            <label>Answer {form.id}</label>
            <div className={sharedStyles.inputWithButtons}>
                <input className={styles.input} value={form?.answer} onChange={(e)=> setForm((prev) => ({...prev, answer: e.target.value}))}/>
                <span className={sharedStyles.inlineIconButtons}>
                    <Save onClick={() => addAnswer(form)}/>
                    <Delete onClick={() => removeAnswer(form.id)}/>
                </span>
            </div>
        </div>
    )
}

export default MultiChoiceOption;