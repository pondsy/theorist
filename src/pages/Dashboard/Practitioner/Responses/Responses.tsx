import styles from './Responses.module.scss';
import sharedStyles from '../../../../styles/shared.module.scss';
import React, {useMemo, useState} from "react";
import {Client} from "../../../../store/practitioner/practitionerTypes";
import {ClientQuestionnaire} from "../../../../store/client/clientTypes";
import {useAppSelector} from "../../../../store/store";
import Modal from "../../../../components/Modal";
import ResponseCard from "./ResponseCard";
import ViewResponses from "../../../../components/ViewResponses";

const Responses = () => {

    const clients = useAppSelector(state => state.practitioner.clients as Required<Client[]>);
    const responses = useAppSelector(state => state.practitioner.responses as Required<ClientQuestionnaire[]>);

    const sorted = useMemo(() => {
        if (responses) {
            return [...responses].sort((a, b) => a.clientId.localeCompare(b.clientId) || a.title.localeCompare(b.title));
        }
        return [];
    }, [responses])
    const [active, setActive] = useState<ClientQuestionnaire>();
    const [client, setClient] = useState<Client>();

    return (
        <div className={styles.page}>

            <h2 className={styles.title}>Client responses</h2>
            <div className={styles.container}>

                {sorted.map((r, id) => {

                    const client = clients.find(client => client.id === r.clientId);
                    if (!client) {
                        return <></>
                    }

                    return (
                        <ResponseCard
                            key={id} client={client} response={r}
                            open={(response) => {
                                setClient(client)
                                setActive(response)
                            }}/>)
                })}

                {!sorted.length && <div className={sharedStyles.message}>
                    No responses found.
                </div>}
            </div>

            {active && <Modal
                open={!!active}
                close={() => setActive(undefined)}
                content={
                    <ViewResponses
                        close={() => setActive(undefined)}
                        fields={active}
                        client={client}
                    />
                }
            />}
        </div>
    )
}

export default Responses;