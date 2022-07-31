import styles from './Clients.module.scss';
import React, {useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {Column} from "react-table";
import sharedStyles from "../../../../styles/shared.module.scss";
import {ReactComponent as Add} from "../../../../resources/svgs/add.svg";
import {useAppSelector} from "../../../../store/store";
import {Client} from "../../../../store/practitioner/practitionerTypes";
import {AuthState} from "../../../../store/auth/authTypes";
import {assignQuestionnaire} from "../../../../store/practitioner/practitionerActions";
import Modal from "../../../../components/Modal";
import Table from "../../../../components/Table";
import Button from "../../../../components/Button";

export interface TableData {
    col1: string;
    col2: string;
    col3: string;
    col4: string[];
    col5: string[];
    col6: Client;
}

const Clients = () => {

    const dispatch = useDispatch()

    const auth = useAppSelector((state) => state.auth as Required<AuthState>);
    const questionnaires = useAppSelector(state => state.practitioner.questionnaires);
    const clients = useAppSelector(state => state.practitioner.clients);

    const [assigning, setAssigning] = useState<Client>();

    const data = useMemo<TableData[]>(() => {
        return clients.map((client) => {
            return [
                {
                    col1: client.name,
                    col2: client.email,
                    col3: client.birthdate,
                    col4: client.questionnaire.new,
                    col5: client.questionnaire.ready,
                    col6: client
                }
            ]
        }).flat();
    }, [clients]);

    const columns = useMemo<Column<TableData>[]>(() => ([
        {
            Header: 'Name',
            accessor: 'col1',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: 'Email',
            accessor: 'col2',
            Cell: (cell) => <div>{cell.value}</div>
        },
        {
            Header: 'Birthdate',
            accessor: 'col3',
            Cell: (cell) => <div>{new Date(cell.value).toLocaleDateString("en-GB", {
                year: "numeric",
                day: "numeric",
                month: "short"
            })}</div>
        },
        {
            Header: 'Assigned',
            accessor: 'col4',
            Cell: (cell) => <div>{cell.value.length}</div>
        },
        {
            Header: 'Ready',
            accessor: 'col5',
            Cell: (cell) => <div>{cell.value.length}</div>
        },
        {
            Header: 'Assign',
            accessor: 'col6',
            Cell: (cell) => <div className={sharedStyles.inlineIconButtons}>
                <React.Fragment>
                    <Add onClick={() => setAssigning(cell.value)}/>
                </React.Fragment>
            </div>
        }
    ]), [clients]);

    const saveSelection = () => {
        if (!assigning) return;
        dispatch(assignQuestionnaire(auth.user.uid, assigning));
        setAssigning(undefined);
    }

    const closeModal = () => {
        setAssigning(undefined);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!assigning) return;
        const current = {
            ...assigning,
            questionnaire: {
                ...assigning.questionnaire,
                new: [
                    ...e.target.checked ?
                        assigning.questionnaire.new.concat(e.target.value) :
                        assigning.questionnaire.new.filter((id) => id !== e.target.value)
                ],
            }
        };

        setAssigning(current)
    }

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Clients</h2>
            <Table columns={columns} data={data}/>
            {assigning &&
                <Modal open={!!assigning} className={styles.modal} content={<React.Fragment>
                    <h2>Available to assign</h2>
                    {questionnaires.map((questionnaire, id) => (
                        <label key={id} className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                checked={assigning?.questionnaire.new.includes(questionnaire.id!)}
                                value={questionnaire.id!}
                                onChange={(e) => handleChange(e)}
                                className={styles.checkbox}
                            />
                            <h4>{questionnaire.title}</h4>
                        </label>
                    ))}
                    {<div className={styles.footerButtons}>
                        <Button text="Save" onClick={saveSelection}/>
                        <Button text="Close" onClick={closeModal}/>
                    </div>}
                </React.Fragment>}/>
            }
        </div>
    )
}

export default Clients;