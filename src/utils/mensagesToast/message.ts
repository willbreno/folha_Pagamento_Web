import { MutableRefObject } from "react";

export interface messageProps {
    toast: MutableRefObject<null>
    severity:string
    summary:string
    detail:string
}

export const message = ({toast,detail,severity,summary}:messageProps) => {
    // @ts-ignore
    toast.current.show({severity:severity, summary: summary, detail:detail, life: 3000});
}