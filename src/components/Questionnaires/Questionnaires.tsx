import styles from './Questionnaires.module.scss';
import sharedStyles from '../../styles/shared.module.scss';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {Column} from "react-table";
import {ReactComponent as Add} from "../../resources/svgs/add.svg";
import {ReactComponent as Confirm} from "../../resources/svgs/confirm.svg";
import {ReactComponent as Regard} from "../../resources/svgs/regard.svg";
import {ReactComponent as Edit} from "../../resources/svgs/edit.svg";
import {ReactComponent as Delete} from "../../resources/svgs/delete.svg";
import EditQuestionnaire from "./EditQuestionnaire";
import Modal from "../Modal";
import Table from "../Table";
import {QuestionType} from "./EditQuestionnaire/EditQuestionnaire";
import {FreeText} from "./FreeTextQuestion/FreeTextQuestion";
import {MultiChoice} from "./MultiChoiceQuestion/MultiChoiceQuestion";
import {useDispatch} from "react-redux";
import {deleteQuestionnaire, getQuestionnaires, saveQuestionnaire} from "../../store/practitioner/practitionerActions";
import {useAppSelector} from "../../store/store";
import {AuthState} from "../../store/auth/authTypes";


export interface Questionnaire {
    id: string|null;
    title: string;
    questions: (FreeText|MultiChoice)[];
    added: string;
    clients?: string[];
    filledIn?: string[];
    practitioner?: string;
}

export interface Question {
    id: string;
    title: string;
    type?: QuestionType;
}

export interface TableData {
    col2: string;
    col3: number;
    col4: string;
    col5: string[];
    col6: string[];
    col7: string;
    col8: string;
}

const Questionnaires = () => {

    const dispatch = useDispatch();
    const auth = useAppSelector((state) => state.auth as Required<AuthState>);
    const userData = useAppSelector(state => state.practitioner.questionnaires);
    const [editQuestionnaires, setEditQuestionnaires] = useState<Questionnaire[]>(userData);
    const [edit, setEdit] = useState<Questionnaire>();
    const [add, setAdd] = useState<boolean>();
    const [remove, setRemove] = useState<Questionnaire>();

    const data = useMemo<TableData[]>(() => {
        return editQuestionnaires.map((questionnaire) => {
            const rate = questionnaire?.filledIn?.length && questionnaire?.clients?.length ? questionnaire.filledIn.length / questionnaire.clients.length : 0;
            return [
                {
                    col2: questionnaire.title,
                    col3: questionnaire.questions.length,
                    col4: questionnaire.added,
                    col5: questionnaire.clients||[],
                    col6: questionnaire.filledIn||[],
                    col7: `${(rate).toFixed(2)} %`,
                    col8: questionnaire.id || ''
                }
            ]
        }).flat();
    }, [editQuestionnaires]);

    const columns = useMemo<Column<TableData>[]>(() => ([
        {
            Header: 'Title',
            accessor: 'col2',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: 'Questions',
            accessor: 'col3',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: 'Added',
            accessor: 'col4',
            Cell: (cell) => <div>{new Date(cell.value).toLocaleDateString("en-GB", {
                year: "numeric",
                day: "numeric",
                month: "short"
            })}</div>
        },
        {
            Header: 'Clients',
            accessor: 'col5',
            Cell: (cell) => <div>{cell.value.length}</div>
        },
        {
            Header: 'Filled in',
            accessor: 'col6',
            Cell: (cell) => <div>{cell.value.length}</div>
        },
        {
            Header: 'Rate',
            accessor: 'col7',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: '',
            accessor: 'col8',
            Cell: (cell) => <div className={sharedStyles.inlineIconButtons}>
                {remove && remove.id === cell.value ?
                    <React.Fragment>
                        <Confirm onClick={() => dispatch(deleteQuestionnaire(auth.user.uid, remove))}/>
                        <Regard onClick={() => setRemove(undefined)}/>
                    </React.Fragment> :
                    <React.Fragment>
                        <Edit onClick={() => setEdit(editQuestionnaires.find((q) => q.id === cell.value))}/>
                        <Delete onClick={() => setRemove(editQuestionnaires.find((q) => q.id === cell.value))}/>
                    </React.Fragment>
                }
            </div>
        }
    ]), [editQuestionnaires, remove]);

    useLayoutEffect(() => {
        dispatch(getQuestionnaires(auth.user.uid));
    }, [dispatch, auth.user.uid])

    useLayoutEffect(() => {
        setEditQuestionnaires(userData);
        setAdd(undefined);
        setEdit(undefined);
    }, [userData])

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Active questionnaires</h2>
            <Table columns={columns} data={data}/>
            <div className={styles.addButton} onClick={() => setAdd(true)}><Add className={styles.addIcon}/></div>
            {edit && <Modal
                open={!!edit}
                close={() => setEdit(undefined)}
                content={
                    <EditQuestionnaire
                        close={() => setEdit(undefined)}
                        fields={edit}
                        saveQuestionnaire={(questionnaire) => dispatch(saveQuestionnaire(auth.user.uid, questionnaire))}
                    />
                }
            />}
            {add && <Modal
                open={add}
                close={() => setAdd(undefined)}
                content={
                    <EditQuestionnaire
                        close={() => setAdd(undefined)}
                        saveQuestionnaire={(questionnaire) => dispatch(saveQuestionnaire(auth.user.uid, questionnaire))}
                    />
                }
            />}
        </div>
    )
}

export default Questionnaires;