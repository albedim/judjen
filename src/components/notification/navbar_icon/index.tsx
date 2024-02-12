import React from "react"
import { IoNotificationsOutline } from "react-icons/io5"

interface NavBarNotificationIconProps{
  notifications: any[]
  onClick: () => void
  unread_notifications: number
}

const NavBarNotificationIcon: React.FC<NavBarNotificationIconProps> = ( props ) => {
  return(
    <>
      {props.unread_notifications > 0 ? (
        <div style={{ paddingBottom: 1, paddingTop: 1, paddingRight: 6, paddingLeft: 6 }} className="items-center justify-around flex rounded-full text-[white] bg-[#668AE4] ml-3 absolute">
          <p className="font-cabin text-xs">{props.unread_notifications > 9 ? "9+" : props.unread_notifications}</p>
        </div>
      ):null}
      <button onClick={props.onClick}>
        <IoNotificationsOutline size={24}/>
      </button>
    </>
  )
}

export default NavBarNotificationIcon