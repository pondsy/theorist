import styles from './Divider.module.scss';

interface Props {
    color?: string;
    width?: string;
}

const Divider = ({color, width}: Props) => {
    return (
        <div className={styles.divider} style={{background: color, width}}/>
    )
}

export default Divider;