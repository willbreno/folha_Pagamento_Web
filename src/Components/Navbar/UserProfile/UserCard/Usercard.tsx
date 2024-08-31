interface UserCardprops{
    isShow:Boolean
}

export const UserCard = ({isShow}:UserCardprops) => {
    return(
        <div className={`absolute transition-all duration-300 ${isShow ? "opacity-100" : "opacity-0 hidden"} w-60 h-80 bg-gray-200 rounded-3xl translate-y-20`}>
                
        </div>
    )
}