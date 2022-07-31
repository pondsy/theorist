import styles from './Questionnaires.module.scss';
import sharedStyles from '../../../../styles/shared.module.scss';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import {Column} from "react-table";
import {ReactComponent as Add} from "../../../../resources/svgs/add.svg";
import {ReactComponent as Confirm} from "../../../../resources/svgs/confirm.svg";
import {ReactComponent as Regard} from "../../../../resources/svgs/regard.svg";
import {ReactComponent as Edit} from "../../../../resources/svgs/edit.svg";
import {ReactComponent as Delete} from "../../../../resources/svgs/delete.svg";
import EditQuestionnaire from "./EditQuestionnaire";
import {useDispatch} from "react-redux";
import {AuthState} from "../../../../store/auth/authTypes";
import {useAppSelector} from "../../../../store/store";
import {Questionnaire} from "../../../../store/practitioner/practitionerTypes";
import {deleteQuestionnaire, saveQuestionnaire} from "../../../../store/practitioner/practitionerActions";
import Table from "../../../../components/Table";
import Modal from "../../../../components/Modal";

export interface TableData {
    col1: string;
    col2: number;
    col3: string;
    col4: number;
    col5: number;
    col6: string;
    col7: string;
}

const Questionnaires = () => {

    const dispatch = useDispatch();

    const auth = useAppSelector((state) => state.auth as Required<AuthState>);
    const practitioner = useAppSelector(state => state.practitioner);
    const {questionnaires, clients} = practitioner;

    const [editQuestionnaires, setEditQuestionnaires] = useState<Questionnaire[]>(questionnaires);
    const [edit, setEdit] = useState<Questionnaire>();
    const [add, setAdd] = useState<boolean>();
    const [remove, setRemove] = useState<Questionnaire>();

    const data = useMemo<TableData[]>(() => {
        return editQuestionnaires.map((questionnaire) => {
            const assigned = clients.filter((client) => client.questionnaire.new.includes(questionnaire.id!)).length || 0;
            const filledIn = clients.filter((client) => client.questionnaire.ready.includes(questionnaire.id!)).length || 0;
            const rate = filledIn / assigned || 0;

            return [
                {
                    col1: questionnaire.title,
                    col2: questionnaire.questions.length,
                    col3: questionnaire.added,
                    col4: assigned,
                    col5: filledIn,
                    col6: `${(rate).toFixed(2)} %`,
                    col7: questionnaire.id!
                }
            ]
        }).flat();
    }, [editQuestionnaires]);

    const columns = useMemo<Column<TableData>[]>(() => ([
        {
            Header: 'Title',
            accessor: 'col1',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: 'Questions',
            accessor: 'col2',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: 'Added',
            accessor: 'col3',
            Cell: (cell) => <div>{new Date(cell.value).toLocaleDateString("en-GB", {
                year: "numeric",
                day: "numeric",
                month: "short"
            })}</div>
        },
        {
            Header: 'Clients',
            accessor: 'col4',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: 'Filled in',
            accessor: 'col5',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: 'Rate',
            accessor: 'col6',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: '',
            accessor: 'col7',
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
        setEditQuestionnaires(questionnaires);
        setAdd(undefined);
        setEdit(undefined);
    }, [questionnaires])

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