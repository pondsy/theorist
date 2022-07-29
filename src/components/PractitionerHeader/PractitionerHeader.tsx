import styles from './PractitionerHeader.module.scss';
import {ReactComponent as Circle} from "../../resources/svgs/circle.svg";

interface Props {
    setActive: (active: string) => void
}

const PractitionerHeader = ({setActive}: Props) => {

    const pages = ["Questionnaires", "Clients", "Responses"];

    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <Circle className={styles.companyLogo}/>
                <h1>Theorist</h1>
            </div>
            <div className={styles.links}>
                {pages.map((page) => (
                    <div onClick={() => setActive(page)}>{page}</div>
                ))}
            </div>
        </div>
    )
}

export default PractitionerHeader;