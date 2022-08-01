import styles from './Header.module.scss';
import {ReactComponent as Circle} from "../../resources/svgs/circle.svg";
import {ReactComponent as PowerOff} from "../../resources/svgs/powerOff.svg";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {removeAuth} from "../../store/auth/authActions";
import {useNavigate} from "react-router-dom";
import {PURGE} from "redux-persist/es/constants";

interface Props {
    paths: string[];
    setActivePage: (active: string) => void;
}

const Header = ({paths, setActivePage}: Props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [active, setActive] = useState<string>(paths[0]);

    useEffect(() => {
        setActivePage(active)
    }, [setActivePage, active])

    const logout = () => {
        navigate('/');
        dispatch(removeAuth());
        localStorage.clear();
        dispatch({
            type: PURGE,
            key: "root",
            result: () => console.log('Store purged!')
        });
    }

    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <Circle className={styles.companyLogo}/>
                <h1>Theorist</h1>
            </div>
            <div className={styles.links}>
                {paths.map((page, id) => (
                    <div key={id} className={`${page === active ? styles.active : ''}`}
                         onClick={() => setActive(page)}>{page}</div>
                ))}
                <PowerOff onClick={logout} className={styles.logout}/>
            </div>
        </div>
    )
}

export default Header;