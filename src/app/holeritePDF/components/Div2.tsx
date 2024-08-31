export const Div2 = () => {
    return (
        <div className="w-full h-[75px] flex">
            <div className="w-1/2 h-full border-r border-black p-1">
                <p className="font-bold">Matrícula</p>
            </div>
            <div className="w-full h-full border-r border-black p-1">
                <p className="font-bold">Nome</p>
            </div>
            <div className="w-[84%] h-full border-r border-black p-1">
                <p className="font-bold">Cargo</p>
            </div>
            <div className="w-[55%] h-full p-1">
                <p className="font-bold">Admissão</p>
            </div>
        </div>
    )
}