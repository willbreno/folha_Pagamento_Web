import { Input } from "@/Components/Input/Input"

export const SingleInputImposto = () => {
    function eventInput(value: string): void {
        throw new Error("Function not implemented.")
    }

    return(
        <>
            <div className="w-24">
                <Input disabled={true} value={99999} type={"text"} eventInput={eventInput} />
            </div>
        </>
    )
}