
import styles from "../styles/components/icon.module.css"

interface Props {
    icon? : React.ReactNode;
    onClick? : () => void;
}

export default function Button(props : Props){
    return (
        <div 
            className={[styles.icon_button].join(" ")}
            onClick={ props.onClick}
        >
            {props.icon}
        </div>
    )
}

export function MenuButton(props: Props){
    return (
        <div 
            onClick={ props.onClick}
        >
            {props.icon}
        </div>
    )
}