import { Link } from "react-router-dom"
import { Topic, UserStory } from "../../typos/interfaces"
import { formatDate } from "../../utils/dates"
import { FaBookmark, FaRetweet } from "react-icons/fa6"
import { SpinnerCircular } from "spinners-react"
import { useState } from "react"
import axios from "axios"
import './index.css'
import { BASE_URL, getCookie } from "../../utils/api"

interface UserStoryProps{
  story: UserStory,
  onOpen: () => void
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
    <div className="pl-0 p-2" >
      <div className="story_height bg-[#fcfcfc] story_width p-4 rounded-md border">
        <div className="items-center justify-between flex">
          <div className="flex">
            {props.story.topics.map((topic: Topic) => (
              <div className="pl-0 p-1">
                <div style={{ paddingBottom: 2, paddingTop: 2 }} className="items-center flex text-xs font-cabin text-[white] pr-2 pl-2 rounded-md bg-[#668AE4]">
                  <p>{topic.name}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[gray] font-cabin">{formatDate(props.story.created_on)}</p>
        </div>
        <h1 className="mt-2 font-semibold text-xl font-cabin">{props.story.title}</h1>
        <div className="items-center flex">
          {!props.story.is_page_user_owner ? (
            <div className="flex">
              <Link to={"/user/" + props.story.user.user_id} >
                <p className="text-[gray] hover:underline font-cabin">
                  Di {props.story.user.anonymous_name}
                </p>
              </Link>           
              {props.showRepost ? (
                <div className="rounded-md text-xs bg-[#668AE4] bg-opacity-20 ml-4 font-semibold items-center flex font-cabin pr-2 pl-2 text-[#668AE4]">
                  <FaRetweet size={18} />
                  <p className="pl-1">Repostata</p>
                </div>
              ) : null}
            </div>
          ):(
            props.story.is_requesting_user_owner ? (
              <p className="text-[gray] font-cabin">Tua</p>          
            ):(
              <p className="text-[gray] font-cabin">Di {props.story.user.anonymous_name}</p>
            )
          )}
        </div>
        <div className="mt-4">
          {props.story.content.length > 246 ? (
            <>
              <p dangerouslySetInnerHTML={{ __html: props.story.content.substring(0, 246) + " ..." }} className="font-cabin" style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}></p>
              <span onClick={props.onOpen} className="ml-2 cursor-pointer underline font-semibold font-cabin">Mostra ancora</span>
            </>
          ):(
            <p dangerouslySetInnerHTML={{ __html: props.story.content }} className="font-cabin" style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}></p>
          )}
        </div>
        <div className="bottom-4 story_bottom mt-6 gap-14 flex">
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