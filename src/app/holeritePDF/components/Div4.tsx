export const Div4 = () => {
    return (
        <div className="w-full h-[120px] flex">
            <div className="flex flex-col text-center w-[40px] min-w-[33px] h-full justify-center border-t border-r border-black px-1 ">
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
            </div>
            <div className="flex flex-col gap-3 w-full h-full border-t border-r border-black">
                <div className="flex justify-between">
                    <p>
                        Salario base Mensalista:
                    </p>
                    <p className="font-bold">
                        R$ 2000
                    </p>
                </div>
                <div className="flex justify-between">
                    <p>
                        INSS:
                    </p>
                    <p className="font-bold">
                        R$ 300
                    </p>
                </div>
                <div className="flex justify-between">
                    <p>
                        I.R.R.F:
                    </p>
                    <p className="font-bold">
                        R$ 300
                    </p>
                </div>
            </div>
            <div className="w-1/2 flex flex-col h-full border-r border-t border-black">
                <div className="h-[75%]">
                    <p className="font-bold text-right">
                        R$ 20001
                    </p>
                </div>
                <div className="border-t border-black">
                <p className="font-bold text-right">
                    R$ 123
                </p>
                </div>
            </div>
            <div className="w-1/2 h-full border-t border-black">
                <div className="h-[75%]">
                <p className="font-bold text-right">
                R$ 123
                </p>
                </div>
                <div className="border-t border-black">
                <p className="font-bold text-right">
                R$ 123
                </p>
                </div>
            </div>
        </div>
    )
}