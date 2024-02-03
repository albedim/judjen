import { Link } from "react-router-dom"
import { Topic, UserStory } from "../../typos/interfaces"
import { formatDate } from "../../utils/dates"
import { FaBookmark, FaRetweet } from "react-icons/fa6"
import { SpinnerCircular } from "spinners-react"
import { useState } from "react"
import axios from "axios"
import { BASE_URL, getCookie } from "../../utils/api"

interface UserStoryProps{
  story: UserStory,
  onRepost: () => void
  showRepost: boolean
  onFavorite: () => void
}

const UserStoryComponent: React.FC<UserStoryProps> = ( props ) => {

  const [isRepostLoading, setIsRepostLoading] = useState(false)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)

  const repost = async ( storyId: number ) => {
    setIsRepostLoading(true)
    await axios.post(BASE_URL + "/reposts/", {story_id: storyId }, { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => props.onRepost())
    .catch(err => console.log(err))
    setIsRepostLoading(false)
  }

  const favorite = async ( storyId: number ) => {
    setIsFavoriteLoading(true)
    await axios.post(BASE_URL + "/favorites/", {story_id: storyId }, { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => props.onFavorite())
    .catch(err => console.log(err))
    setIsFavoriteLoading(false)
  }

  return(
    <div className="pb-2" >
      <div style={{ width: 450 }} className="p-4 rounded-md border">
        <div className="items-center justify-between flex">
          <div className="flex">
            {props.story.topics.map((topic: Topic) => (
              <div className="pl-0 p-1">
                <div style={{ paddingBottom: 2, paddingTop: 2 }} className="items-center flex text-xs font-cubito text-[white] pr-2 pl-2 rounded-md bg-[#668AE4]">
                  <p>{topic.name}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[gray] font-cubito">{formatDate(props.story.created_on)}</p>
        </div>
        <h1 className="mt-2 font-semibold text-xl font-cubito">{props.story.title}</h1>
        <div className="items-center flex">
          {!props.story.own ? (
            <div className="flex">
              <Link to={"/user/" + props.story.user.user_id} ><p className="text-[gray] hover:underline font-cubito">By {props.story.user.anonymous_name}</p></Link>           
              {props.showRepost ? (
                <div className="rounded-md text-xs bg-[#668AE4] bg-opacity-20 ml-4 font-semibold items-center flex font-cubito pr-2 pl-2 text-[#668AE4]">
                  <FaRetweet size={18} />
                  <p className="pl-1">Repost</p>
                </div>
              ) : null}
            </div>
          ):(
            <p className="text-[gray] font-cubito">By {props.story.user.anonymous_name}</p>          
          )}
        </div>
        <div className="mt-4">
          <p  style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>{props.story.content}</p>
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
            <button onClick={() => repost(props.story.story_id)} >
              <div style={{ color: props.story.reposted ? '#668AE4' : 'gray' }} className="transition-all hover:opacity-60 cursor-pointer items-center flex">
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
            <button onClick={() => favorite(props.story.story_id)} >
              <div style={{ color: props.story.favorited ? '#668AE4' : 'gray' }} className="transition-all hover:opacity-60 cursor-pointer items-center flex">
                <div><FaBookmark size={16} /></div>
                <p className="pl-2 font-semibold ">{props.story.favorites}</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserStoryComponent