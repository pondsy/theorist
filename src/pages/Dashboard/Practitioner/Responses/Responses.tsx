import {useAppSelector} from "../../../../store/store";
import styles from "../Questionnaires/Questionnaires.module.scss";
import React, {useState} from "react";
import ResponseCard from "../ResponseCard";
import {ClientQuestionnaire} from "../../../../store/client/clientTypes";
import Modal from "../../../../components/Modal";
import ViewResponses from "../ViewResponses";
import {Client} from "../../../../store/practitioner/practitionerTypes";

const Responses = () => {

    const practitioner = useAppSelector(state => state.practitioner);
    const {clients, responses} = practitioner;

    const [active, setActive] = useState<ClientQuestionnaire>();
    const [client, setClient] = useState<Client>();

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Client responses</h2>

            {responses.map((r, id) => {

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

            {active && <Modal
                open={!!active}
                close={() => setActive(undefined)}
                className={styles.modal}
                content={
                    <ViewResponses
                        close={() => setActive(undefined)}
                        fields={active}
                        client={client!}
                    />
                }
            />}
        </div>
    )
}

export default Responses;