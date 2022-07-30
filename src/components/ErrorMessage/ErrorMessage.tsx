import styles from "./ErrorMessage.module.scss";

interface Props {
    error: string;
}

const ErrorMessage = ({error}: Props) => {
    return (
        <span className={styles.error}>
            {error}
        </span>
    );
};

export default ErrorMessage;