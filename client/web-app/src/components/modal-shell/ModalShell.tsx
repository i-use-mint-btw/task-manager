import { ReactNode, useRef } from "react"
import styles from "./modal-shell.module.css"

interface IProps {
    visible: boolean
    onOutOfBoundsClick: () => void
    children?: ReactNode
}

export default function ModalShell(props: IProps) {
    const modalRef = useRef<HTMLDivElement | null>(null)

    return (
        <>
            <div ref={modalRef} className={props.visible ? styles.rootContainer : styles.invisible} onClick={props.onOutOfBoundsClick}>
                <div className={styles.mainContainer}>
                    {props.children}
                </div>
            </div>
        </>
    )
}