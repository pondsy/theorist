import {motion} from "framer-motion"
import {ReactNode} from "react";

interface Props {
    duration?: number;
    ease?: string;
    className?: string;
    children: ReactNode;
}

const Motion = ({duration = 0.2, ease = "easeIn", className, children}: Props): JSX.Element => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease, duration}}
            className={className}>
            {children}
        </motion.div>
    )
}

export default Motion;