import { Input } from "@/Components/Input/Input"

export const InputImpostos = () => {
    function eventInput(value: string): void {
        throw new Error("Function not implemented.")
    }

    return(
        <>
            <div className="flex gap-5 items-center">
                <Input disabled={true} value={99999} type={"text"} eventInput={eventInput}  />
                ate
                <Input disabled={true} value={99999} type={"text"} eventInput={eventInput}  />
            </div>
        </>
    )
}