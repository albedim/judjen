import Avatar from "boring-avatars"
import React, { useState } from "react"
import { Friend } from "../../../typos/interfaces"
import { SpinnerCircular } from "spinners-react"
import { FaRegTrashCan } from "react-icons/fa6"
import axios from "axios"
import { BASE_URL, getCookie } from "../../../utils/api"
import { formatDate } from "../../../utils/dates"
import { Link } from "react-router-dom"

interface FriendProps{
  friend: Friend,
  setFriends: (friends: any) => void
}

const FriendComponent: React.FC<FriendProps> = ( props ) => {

  const [isLoading, setIsLoading] = useState(false)

  const removeFriend = async (name: string) => {
    setIsLoading(true)
    await axios.delete(BASE_URL + "/friends/" + name, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => props.setFriends(res.data.param.friends))
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  return(
    <div className="pb-2">
      <div className="bg-[#fcfcfc] justify-between rounded-lg flex p-4 border">
        <Link to={"/user/" + props.friend.user_id}>
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
              <p className="text-sm text-[gray] font-cabin">
                Amici dal {formatDate(props.friend.created_on)}
              </p>
            </div>
          </div>
        </Link>
        <div className="items-center justify-around flex">
          {isLoading ? (
            <div>
              <SpinnerCircular
                color="red"
                speed={254}
                size={24}
                thickness={184}
                secondaryColor="#fafafa"
              />
            </div>
          ):(
            <button onClick={() => removeFriend(props.friend.user_id)} >
              <FaRegTrashCan color="red" size={16}/>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FriendComponent