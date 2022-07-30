import styles from './PractitionerHeader.module.scss';
import {ReactComponent as Circle} from "../../resources/svgs/circle.svg";
import {useEffect, useState} from "react";

interface Props {
    setActivePage: (active: string) => void
}

const PractitionerHeader = ({setActivePage}: Props) => {

    const [active, setActive] = useState<string>('Questionnaires');
    const pages = ["Questionnaires", "Clients", "Responses"];

    useEffect(() => {
        setActivePage(active)
    }, [setActivePage, active])

    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <Circle className={styles.companyLogo}/>
                <h1>Theorist</h1>
            </div>
            <div className={styles.links}>
                {pages.map((page, id) => (
                    <div key={id} className={`${page === active ? styles.active : ''}`} onClick={() => setActive(page)}>{page}</div>
                ))}
            </div>
        </div>
    )
}

export default PractitionerHeader;