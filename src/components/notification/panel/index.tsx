import Avatar from "boring-avatars"
import React from "react"
import { Notification } from "../../../typos/interfaces"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../utils/dates"
import { FaCircle } from "react-icons/fa6"
import axios from "axios"
import { BASE_URL, getCookie } from "../../../utils/api"
import NotFound from "../../notfound"

interface NavBarNotificationPanelProps{
  notifications: Notification[],
  onRead: () => void
}

const NavBarNotificationPanel: React.FC<NavBarNotificationPanelProps> = ( props ) => {

  const navigate = useNavigate()

  const markAsRead = async (notificationId?: number) => {
    let body = {}
    if (notificationId) {
      body = { notification_id: notificationId }
    }
    await axios.post(BASE_URL + "/notifications/read", body, { headers: { Authorization: 'Bearer ' + getCookie("jwt-token") } })
    .then(res => props.onRead())
    .catch(err => console.log(err))
  }

  return(
    <div className="pr-0 z-50 absolute mt-16 right-4 bg-[white] rounded-md border p-4">
      <div className="mr-4 justify-between flex pb-2 border-b">
        <p className="font-semibold text-lg font-cabin">Notifications</p>
        <button disabled={props.notifications.length == 0} onClick={() => markAsRead()}>
          <p className="text-[#668AE4] font-semibold text-sm font-cabin">Mark all as read</p>
        </button>
      </div>
      <div style={{ width: 340, maxHeight: 540 }} className="overflow-y-scroll mt-4">
        {props.notifications.length > 0 ? (
          props.notifications.map((notification: Notification) => (
            <div className="justify-between pt-1 items-center flex pl-0 p-4">
              <div className="flex">
                <button onClick={() => navigate("/user/" + notification.target.user_id)}>
                  <Avatar
                    size={42}
                    name={notification.target.anonymous_name}
                    variant="beam"
                    colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
                  />
                </button>
                <div className="pl-4">
                  <button onClick={() => navigate(notification.href)}><p style={{ textAlign: 'left', maxWidth: 194 }} >{notification.content}</p></button>
                  <p className="text-[gray] font-cabin text-sm">{formatDate(notification.datetime)}</p>
                </div>
              </div>
              <div className="items-center justify-around flex">
                <a title="Mark ak read">
                  <button onClick={() => markAsRead(notification.notification_id)}>
                    <FaCircle className="transition-all hover:opacity-80" size={10.4} color="#668AE4"/>
                  </button>
                </a>
              </div>
            </div>
          ))
        ):(
          <NotFound message="No notifications found"/>
        )}
      </div>
    </div>
  )
}

export default NavBarNotificationPanel