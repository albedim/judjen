import Avatar from "boring-avatars"
import '../index.css'
import { useEffect, useState } from "react"
import { FaBookmark, FaRetweet } from "react-icons/fa6"
import { Story, StorySchema, Topic } from "../../typos/interfaces"
import axios from "axios"
import { BASE_URL, getCookie } from "../../utils/api"
import { SpinnerCircular } from "spinners-react"
import LoginScreen from "../../components/login_screen"
import { Link } from "react-router-dom"
import StoryComponent from "../../components/story"
import NotFound from "../../components/notfound"
import { MdNavigateNext, MdNextPlan, MdOutlineNextPlan, MdOutlineNextWeek, MdSkipNext } from "react-icons/md"
import { IoIosArrowForward } from "react-icons/io"

const HomePage = () => {

  const [story, setStory] = useState<Story>(StorySchema)

  const getStory = async () => {
    await axios.get(BASE_URL + "/stories/", { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => setStory(res.data.param))
    .catch(err => console.log(err))
  }

  const repost = async (created: boolean) => {
    setStory({ 
      ...story, 
      reposted: created,
      reposts: created ? story.reposts + 1 : story.reposts - 1
    })
  }

  const favorite = async (created: boolean) => {
    setStory({ 
      ...story, 
      favorited: created,
      favorites: created ? story.favorites + 1 : story.favorites - 1
    })
  }

  useEffect(() => {
    getStory()
  },[])

  return (
    <>
      <LoginScreen/>
      <div className="mlpage p-8 w-full">
        <div className="pb-4">
          <h1 className="text-xl font-semibold font-cabin" >Stories</h1>
        </div>
        <div className="items-center flex pl-0 p-4">
          {story ? (
            <>
              <StoryComponent onFavorite={favorite} onRepost={repost} story={story}/>
              <button onClick={() => getStory()} className="hover:hover:opacity-60 text-[#668AE4] pl-6">
                <IoIosArrowForward size={42}/>
                <p className="text-center text-md font-semibold font-cabin" >Next</p>
              </button>
            </>
          ):(
            <NotFound message="No story found" />
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage