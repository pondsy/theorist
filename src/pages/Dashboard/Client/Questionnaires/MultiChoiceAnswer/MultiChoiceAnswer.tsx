import React, {useEffect, useId, useState} from "react";
import styles from "../MultiChoiceAnswer/MultiChoiceAnswer.module.scss";
import sharedStyles from "../../../../../styles/shared.module.scss";
import {MultiChoice, Option, QuestionType} from "../../../../../store/practitioner/practitionerTypes";
import {ReactComponent as Back} from "../../../../../resources/svgs/back.svg";
import {ReactComponent as Next} from "../../../../../resources/svgs/next.svg";
import Button from "../../../../../components/Button";


interface Props {
    className: string;
    values?: MultiChoice;
    index: number;
    length: number;
    addAnswer: (form: MultiChoice, final: boolean) => void;
    goBack: (index: number) => void;
}

const MultiChoiceAnswer = ({className, values, index, length, addAnswer, goBack}: Props) => {

    const id = useId();

    const [selected, setSelected] = useState<boolean>(false);
    const [form, setForm] = useState<MultiChoice>({
        id,
        title: '',
        type: QuestionType.multiChoice,
        options: []
    });

    useEffect(() => {
        if (values) setForm(values);
    }, [values])

    const selectAnswer = (selected: Option) => {
        const data = {
            ...form,
            options: form.options?.map((option) => {
                if (option.id === selected.id) {
                    return {
                        ...selected,
                        selected: !option.selected
                    }
                }
                return {
                    ...option,
                    selected: false
                };
            })
        }

        setSelected(true);
        setForm(data);
    }

    return (
        <div key={form.id} className={className}>
            <label>{form?.title}</label>
            <div>Question {index + 1}/{length}</div>

            <div className={styles.questions}>
                {form.options && form.options.map((option, id) => (
                    <label key={id}
                           className={`${sharedStyles.textWithButtons} ${styles.selectable} ${option.selected && styles.selected}`}>
                        <input
                            type="radio"
                            name="option"
                            value={option.id}
                            onChange={() => selectAnswer(option)}
                            className={styles.checkbox}
                        />
                        <h4>{option.answer}</h4>
                    </label>
                ))}
            </div>

            {<div className={sharedStyles.footerNav}>
                {index !== 0 && <Back style={{marginRight: 'auto'}} onClick={() => goBack(index - 1)}/>}
                {index !== length - 1 &&
                    <Next className={`${!selected ? sharedStyles.disabled : ''}`} style={{marginLeft: 'auto'}}
                          onClick={() => selected && addAnswer(form, false)}/>}
                {index === length - 1 && <Button disabled={!selected} style={{marginLeft: 'auto'}} text={'Save'}
                                                 onClick={() => addAnswer(form, true)}/>}
            </div>}
        </div>
    )
}

export default MultiChoiceAnswer;