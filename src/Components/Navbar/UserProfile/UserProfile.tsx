import { useState } from "react"
import eu from "../../../../assets/myImage.jpg"
import Image from "next/image"
import { UserCard } from "./UserCard/Usercard"

export const UserProfile = () =>{
    const [isShow, setisShow] = useState(false)
    return(
        <div className="flex w-full justify-end ">
            <div className="flex items-center gap-2">
                <button onMouseEnter={() => setisShow(true)} onMouseLeave={() => setisShow(false)} className="w-16 h-16 bg-green-700 rounded-full">
                    <Image src={eu} alt="ImagePerfil" className="w-full h-full rounded-full" />
                </button>
                <p className="text-black">Mario Alberto</p>
            </div>
            <UserCard isShow={isShow} />
        </div>
    )
}