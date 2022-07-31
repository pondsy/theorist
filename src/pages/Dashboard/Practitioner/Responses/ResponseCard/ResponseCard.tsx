import styles from './ResponseCard.module.scss';
import {ClientQuestionnaire} from "../../../../../store/client/clientTypes";
import {Client} from "../../../../../store/practitioner/practitionerTypes";

interface Props {
    response: ClientQuestionnaire;
    client: Client;
    open: (response: ClientQuestionnaire) => void;
}

const ResponseCard = ({response, client, open}: Props) => {

    return (
        <div className={styles.card} onClick={() => open(response)}>
            <div>{response.title}</div>
            <div>{response.questions.length} answers</div>
            <div>Filled in by {client.name}</div>
        </div>
    )
}

export default ResponseCard;