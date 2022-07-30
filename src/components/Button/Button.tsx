import styles from "./button.module.scss";
import React, {useState} from "react";

interface Props {
    text?: string;
    color?: string;
    hoverColor?: string;
    icon?: JSX.Element;
    onClick: (value?: any) => void;
    padding?: string;
}

const Button = ({text, color = 'var(--color-action)', hoverColor = 'var(--color-secondary)', padding, icon, onClick}: Props) => {

    const [hovering, setHovering] = useState(false);

    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{background: hovering ? hoverColor : color, padding}}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {icon}{text}
        </button>
    )
}

export default Button;