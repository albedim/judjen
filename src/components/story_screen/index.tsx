import React, { useEffect, useState } from "react"
import { BASE_URL, isLoggedIn, setCookie } from "../../utils/api"
import axios from "axios"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { IoClose, IoDice } from "react-icons/io5"
import { SpinnerCircular } from "spinners-react"
import Avatar from "boring-avatars"
import { Story, Topic } from "../../typos/interfaces"

interface StoryScreenProps{
  story: null | Story
  onClose: () => void
}

const StoryScreen: React.FC<StoryScreenProps> = ( props ) => {

  if (!props.story) {
    return (
      <></>
    )
  }

  return(
    <div className="fixed z-40 items-center justify-around flex backdrop-blur-sm h-screen w-screen">
      <div style={{ maxWidth: 314 }} className="border p-4 rounded-md bg-[white]">
        <div className="justify-between flex">
          <div className="flex">
            {props.story.topics.map((topic: Topic) => (
              <div className="pl-0 p-1">
                <div 
                  style={{ paddingBottom: 2, paddingTop: 2 }} 
                  className="items-center flex text-xs font-cabin text-[white] pr-2 pl-2 rounded-md bg-[#668AE4]"
                >
                  <p>{topic.name}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={props.onClose} ><IoClose size={24} color="#d4d4d4" /></button>
        </div>
        <h1 className="mt-2 font-semibold text-xl font-cabin">{props.story.title}</h1>
        <div className="items-center flex">
          <div>
            <Avatar
              size={14}
              name={props.story.user.anonymous_name}
              variant="beam"
              colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
            />
          </div>
          <div className="pl-2">
            <Link onClick={props.onClose} to={"/user/" + props.story.user.user_id}>
              <p className="text-[gray] hover:underline font-cabin">{props.story.user.anonymous_name}</p>
            </Link>
            </div>
        </div>
        <div style={{ maxHeight: 445 }} className="overflow-y-scroll pb-4 mt-4">
          <p dangerouslySetInnerHTML={{ __html: props.story.content }} style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }} ></p>
        </div>
      </div>
    </div> 
  )
}

export default StoryScreen