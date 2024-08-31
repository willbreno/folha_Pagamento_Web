import { Div1 } from "./components/Div1";
import { Div2 } from "./components/Div2";
import { Div3 } from "./components/Div3";
import { Div4 } from "./components/Div4";
import { Div4a } from "./components/Div4a";
import { Div5 } from "./components/Div5";
import { Div6 } from "./components/Div6";

export default function Page() {
    return (
        <div className="flex flex-col h-fit gap-10 overflow-hidden">
            <div className="w-screen h-[35%] border-2 border-black">
                <Div1 />
                <Div2 />
                <Div3 />
                <Div4 />
                <Div4a />
                <Div5 />
                <Div6 />
            </div>
        </div>
    )
}