export const Div5 = () => {
    return (
        <div className="w-full h-[60px] grid grid-cols-5 text-center">

            <div className="w-full border-r border-t border-black">
                <p className="font-bold">Salario base</p>
                <p>R$ 2000</p>
            </div>
            <div className="w-full border-r border-t border-black">
                <p className="font-bold">Base INSS</p>
                <p>R$ 2000</p>

            </div>
            <div className="w-full border-r border-t border-black">
                <p className="font-bold">Base FGTS</p>
                <p>R$ 2000</p>

            </div>
            <div className="w-full border-r border-t border-black">
                <p className="font-bold">FGTS</p>
                <p>R$ 2000</p>

            </div>
            <div className="w-full border-t border-black">
                <p className="font-bold">Base IRRF</p>
                <p>R$ 2000</p>
            </div>
        </div>
    )
}