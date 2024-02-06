import Avatar from "boring-avatars"
import { Story, Topic } from "../../typos/interfaces"
import { useState } from "react"
import { BASE_URL, getCookie } from "../../utils/api"
import axios from "axios"
import { Link } from "react-router-dom"
import { SpinnerCircular } from "spinners-react"
import './index.css'
import { FaBookmark, FaRetweet } from "react-icons/fa6"

interface StoryProps{
  onRepost: (created: boolean) => void
  onFavorite: (created: boolean) => void
  story: Story
}

const StoryComponent: React.FC<StoryProps> = ( props ) => {

  const [isRepostLoading, setIsRepostLoading] = useState(false)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)

  const repost = async () => {
    setIsRepostLoading(true)
    await axios.post(BASE_URL + "/reposts/", {story_id: props.story.story_id }, { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => props.onRepost(res.data.param.created))
    .catch(err => console.log(err))
    setIsRepostLoading(false)
  }

  const favorite = async () => {
    setIsFavoriteLoading(true)
    await axios.post(BASE_URL + "/favorites/", {story_id: props.story.story_id }, { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => props.onFavorite(res.data.param.created))
    .catch(err => console.log(err))
    setIsFavoriteLoading(false)
  }

  return(
    <div className="bg-[#fcfcfc] story_width p-4 rounded-md border">
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
          <Link to={"/user/" + props.story.user.user_id}>
            <p className="text-[gray] hover:underline font-cabin">{props.story.user.anonymous_name}</p>
          </Link>
          </div>
      </div>
      <div className="mt-4">
        <p style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }} >{props.story.content}</p>
      </div>
      <div className="mt-6 gap-14 flex">
        {isRepostLoading ? (
          <div>
            <SpinnerCircular
              color="#668AE4"
              speed={254}
              size={24}
              thickness={184}
              secondaryColor="#fafafa"
            />
          </div>
        ):(
          <button onClick={() => repost()} >
            <div 
              style={{ color: props.story.reposted ? '#668AE4' : 'gray' }} 
              className="transition-all hover:opacity-60 cursor-pointer items-center flex"
            >
              <div><FaRetweet size={18} /></div>
              <p className="pl-2 font-semibold ">{props.story.reposts}</p>
            </div>
          </button>
        )}
        {isFavoriteLoading ? (
          <div>
            <SpinnerCircular
              color="#668AE4"
              speed={254}
              size={24}
              thickness={184}
              secondaryColor="#fafafa"
            />
          </div>
        ):(
          <button onClick={() => favorite()} >
            <div 
              style={{ color: props.story.favorited ? '#668AE4' : 'gray' }} 
              className="transition-all hover:opacity-60 cursor-pointer items-center flex"
            >
              <div><FaBookmark size={16} /></div>
              <p className="pl-2 font-semibold ">{props.story.favorites}</p>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default StoryComponent