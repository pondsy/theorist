import styles from './QuestionnaireCard.module.scss';
import {ClientQuestionnaire} from "../../../../../store/client/clientTypes";

interface Props {
    questionnaire: ClientQuestionnaire;
    open: (questionnaire: ClientQuestionnaire) => void;
}

const QuestionnaireCard = ({questionnaire, open}: Props) => {

    return (
        <div className={styles.card} onClick={() => open(questionnaire)}>
            <div>{questionnaire.title}</div>
            <div>{questionnaire.questions.length} questions</div>
        </div>
    )
}

export default QuestionnaireCard;