import Avatar from "boring-avatars"
import React, { useState } from "react"
import { Friend, ReceivedFriendRequest, SentFriendRequest } from "../../../typos/interfaces"
import { SpinnerCircular } from "spinners-react"
import { FaRegTrashCan } from "react-icons/fa6"
import axios from "axios"
import { BASE_URL, getCookie } from "../../../utils/api"
import { formatDate } from "../../../utils/dates"
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io"
import { useNavigate } from "react-router-dom"

interface ReceivedFriendRequestProps{
  friend: ReceivedFriendRequest,
  onAction: () => void
}

const ReceivedFriendRequestComponent: React.FC<ReceivedFriendRequestProps> = ( props ) => {

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const acceptRequest = async ( userId: string ) => {
    setIsLoading(true)
    await axios.post(BASE_URL + "/friends/accept", { user_id: userId }, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      props.onAction()
    })
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  const rejectRequest = async ( userId: string ) => {
    setIsLoading(true)
    await axios.post(BASE_URL + "/friends/reject", { user_id: userId }, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => props.onAction())
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  return(
    <div className="pb-2">
      <div className="bg-[#fcfcfc] justify-between rounded-lg flex p-4 border">
        <div className="flex">
          <div className="items-center justify-around flex">
            <Avatar
              size={40}
              name={props.friend.anonymous_name}
              variant="beam"
              colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
            />
          </div>
          <div className="pl-2">
            <p className="text-md font-semibold font-cabin">{props.friend.anonymous_name}</p>
            <p className="text-sm text-[gray] font-cabin">Ricevuta il {props.friend.received_on}</p>
          </div>
        </div>
        <div className="pl-4 items-center justify-around flex">
          <div className="flex">
            <div className="pr-2">
              <button onClick={() => acceptRequest(props.friend.user_id)} >
                <IoIosAddCircleOutline color="green" size={24}/>
              </button>
            </div>
            <div>
              <button onClick={() => rejectRequest(props.friend.user_id)} >
                <IoIosRemoveCircleOutline color="red" size={24}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceivedFriendRequestComponent