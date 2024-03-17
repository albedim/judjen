import Avatar from "boring-avatars"
import { useEffect, useState } from "react"
import { BASE_URL, getCookie, getUser, isLoggedIn } from "../../utils/api"
import { IoNotificationsOutline } from "react-icons/io5"
import NavBarNotificationIcon from "../notification/navbar_icon"
import NavBarNotificationPanel from "../notification/panel"
import axios from "axios"
import { Notification } from "../../typos/interfaces"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

const NavBar = () => {
  
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unReadNotifications, setUnReadNotifications] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isNotificationsPanelVisible, setIsNotificationsPanelVisible] = useState(false)
  const [user, setUser] = useState<any>()
  const navigate = useNavigate()

  useEffect(() => {
    handleAuth()
  },[])

  const handleAuth = async () => {
    const isLoggedInRes = await isLoggedIn()
    setLoggedIn(await isLoggedIn())
    if (isLoggedInRes) {
      const usr: any = await getUser()
      setUser(usr)
      getNotifications(usr.user_id)
    }
  }

  const getNotifications = async (userId: string) => {
    await axios.get(BASE_URL + "/notifications/user/" + userId)
    .then(res => {
      setNotifications(res.data.param.res)
      setUnReadNotifications(res.data.param.unread_notifications)
    })
    .catch(err => console.log(err))
  }
  
  const redirectToUserAccount = async () => {
    const token: any = getCookie("jwt-token")
    const userId = jwtDecode<any>(token).sub.user_id
    navigate("/user/" + userId)
  }

  return(
    <>
      <div className="pb-4 pt-4 pr-8 pl-8 justify-between bg-[white] z-30 fixed border-b w-screen flex">
        <div></div>
        <div className="gap-6 flex">
          <NavBarNotificationIcon onClick={() => setIsNotificationsPanelVisible((prv) => !prv)} unread_notifications={unReadNotifications} notifications={[]}/>
          <button onClick={redirectToUserAccount}>
            <Avatar
              size={42}
              name={user?.anonymous_name}
              variant="beam"
              colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
            />
          </button>
        </div>
      </div>
      {isNotificationsPanelVisible ? (
        <NavBarNotificationPanel onClose={() => setIsNotificationsPanelVisible(false)} onRead={() => getNotifications(user.user_id)} notifications={notifications}/>
      ):null}
    </>
  )
}

export default NavBar