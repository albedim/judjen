import Avatar from "boring-avatars"
import React, { useState } from "react"
import { Friend, SentFriendRequest } from "../../../typos/interfaces"
import { SpinnerCircular } from "spinners-react"
import { FaRegTrashCan } from "react-icons/fa6"
import axios from "axios"
import { BASE_URL, getCookie } from "../../../utils/api"
import { formatDate } from "../../../utils/dates"

interface SentFriendRequestProps{
  friend: SentFriendRequest
}

const SentFriendRequestComponent: React.FC<SentFriendRequestProps> = ( props ) => {

  return(
    <div className="pb-2">
      <div className="rounded-lg flex p-4 border">
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
          <p className="text-sm text-[gray] font-cabin">Sent on {formatDate(props.friend.sent_on)}</p>
        </div>
      </div>
    </div>
  )
}

export default SentFriendRequestComponent