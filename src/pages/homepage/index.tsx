import Avatar from "boring-avatars"
import './index.css'
import '../index.css'
import { useEffect, useState } from "react"
import { FaBookmark, FaRegStar, FaRetweet } from "react-icons/fa6"
import { Story, StorySchema, Topic } from "../../typos/interfaces"
import axios from "axios"
import { BASE_URL, getCookie } from "../../utils/api"
import { SpinnerCircular } from "spinners-react"
import LoginScreen from "../../components/login_screen"
import { Link, useSearchParams } from "react-router-dom"
import StoryComponent from "../../components/story"
import NotFound from "../../components/notfound"
import { MdNavigateNext, MdNextPlan, MdOutlineNextPlan, MdOutlineNextWeek, MdSkipNext } from "react-icons/md"
import { IoIosArrowForward } from "react-icons/io"
import { Dropdown } from "flowbite-react"
import { IoPeopleCircleOutline, IoPeopleSharp } from "react-icons/io5"
import NavBar from "../../components/navbar"

const storiesTypes = [
  {
    name: 'foryou',
    label: 'For You'
  },
  {
    name: 'friends',
    label: 'Friends'
  }
]

const getStoriesTypeFromName = (name: string) => {
  const res = storiesTypes.filter((storiesType) => storiesType.name == name)
  if (res.length > 0) {
    return res[0]
  }
  return null
}

const HomePage = () => {

  const [story, setStory] = useState<Story>(StorySchema)
  const [searchParams, setSearchParams] = useSearchParams()
  const [storiesType, setStoriesType] = useState<string>()

  const getStory = async () => {
    await axios.get(BASE_URL + "/stories/", { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => setStory(res.data.param))
    .catch(err => console.log(err))
  }

  const getFriendStory = async () => {
    await axios.get(BASE_URL + "/stories/friends", { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
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
    const tab: any = searchParams.get("tab")
    const storiesType = getStoriesTypeFromName(tab)
    if (storiesType !== null) {
      setStoriesType(storiesType?.label)
    } else {
      setStoriesType(storiesTypes[0].label)
    }
    getStory()
  },[])

  return (
    <>
      <LoginScreen/>
      <div className="mt-16 mlpage p-8 w-4/5">
        <div className="justify-between flex pb-4">
          <Dropdown size={40} style={{ paddingLeft: "0px", fontWeight: 900, border: 'none', fontFamily: 'Cabin', backgroundColor: 'white' }} className="rounded-md bg-[white] text-xl font-cabin" label={storiesType} dismissOnClick={true}>
            <Dropdown.Item 
              className="transition-all hover:text-[#668AE4] p-4 pt-2 pb-2 font-semibold font-cabin text-lg" 
              onClick={() => {
                setStoriesType(getStoriesTypeFromName("foryou")?.label)
                getStory()
              }}
            >
              <FaRegStar/>
              <p className="ml-2">For You</p>
            </Dropdown.Item>
            <Dropdown.Item 
              className="transition-all hover:text-[#668AE4] p-4 pt-2 pb-2 font-semibold font-cabin text-lg" 
              onClick={() => {
                setStoriesType(getStoriesTypeFromName("friends")?.label)
                getFriendStory()
              }}
            >
              <IoPeopleCircleOutline/> 
              <p className="ml-2">Friends</p>
            </Dropdown.Item>
          </Dropdown>
          <button onClick={() => getStory()} className="none-flex items-center hover:hover:opacity-60 text-[#668AE4] pl-6">
            <p className="text-md font-semibold font-cabin" >Next</p>
            <IoIosArrowForward size={24}/>
          </button>
        </div>
        <div className="items-center flex pl-0 p-4">
          {story ? (
            <>
              <StoryComponent onFavorite={favorite} onRepost={repost} story={story}/>
              <button onClick={() => {
                if (storiesType == 'For You') {
                  getStory()
                } else {
                  getFriendStory()
                }
              }} className="transition-all block-none hover:hover:opacity-60 text-[#668AE4] pl-6">
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