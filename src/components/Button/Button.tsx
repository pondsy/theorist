import styles from "./button.module.scss";
import React, {useState} from "react";

interface Props {
    text?: string;
    color?: string;
    hoverColor?: string;
    icon?: JSX.Element;
    style?: React.CSSProperties;
    onClick: (value?: any) => void;
    padding?: string;
    disabled?: boolean;
}

const Button = ({text, color = 'var(--color-action)', hoverColor = 'var(--color-secondary)', style, padding, icon, onClick, disabled}: Props) => {

    const [hovering, setHovering] = useState(false);

    return (
        <button
            disabled={disabled}
            className={styles.button}
            onClick={onClick}
            style={{background: hovering ? hoverColor : color, padding, ...style}}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {icon}{text}
        </button>
    )
}

export default Button;