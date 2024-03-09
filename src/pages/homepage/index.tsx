import Avatar from "boring-avatars"
import './index.css'
import '../index.css'
import { useEffect, useState } from "react"
import { FaBookmark, FaRegStar, FaRetweet } from "react-icons/fa6"
import { Story, StorySchema, Topic } from "../../typos/interfaces"
import axios from "axios"
import { BASE_URL, getCookie, isLoggedIn } from "../../utils/api"
import { SpinnerCircular } from "spinners-react"
import LoginScreen from "../../components/login_screen"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import StoryComponent from "../../components/story"
import NotFound from "../../components/notfound"
import { MdNavigateNext, MdNextPlan, MdOutlineNextPlan, MdOutlineNextWeek, MdSkipNext } from "react-icons/md"
import { IoIosArrowDropdown, IoIosArrowDropup, IoIosArrowForward, IoIosArrowUp } from "react-icons/io"
import { Dropdown } from "flowbite-react"
import { IoPeopleCircleOutline, IoPeopleSharp } from "react-icons/io5"
import NavBar from "../../components/navbar"

const storiesTypes = [
  {
    name: 'foryou',
    icon: <FaRegStar/>,
    label: 'Per te'
  },
  {
    name: 'friends',
    icon: <IoPeopleCircleOutline/>,
    label: 'Amici'
  }
]

interface storiesTypesInterface{
  name: string,
  label: string
}

const getStoriesTypeFromName = (name: string) => {
  const res = storiesTypes.filter((storiesType) => storiesType.name == name)
  if (res.length > 0) {
    return res[0]
  }
  return storiesTypes[0]
}

const HomePage = () => {

  const [seenStories, setSeenStories] = useState<Story[]>([])
  const [currIndex, setCurrIndex] = useState<number>(0)
  const [animationLikes, setAnimationLikes] = useState('initial');
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [storiesType, setStoriesType] = useState<storiesTypesInterface>(storiesTypes[0])

  const getStory = async () => {
    await axios.get(BASE_URL + "/stories/", { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => {
      setSeenStories([...seenStories, res.data.param])
    })
    .catch(err => console.log(err))
  }

  const getFriendStory = async () => {
    await axios.get(BASE_URL + "/stories/friends", { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => {
      setSeenStories([...seenStories, res.data.param])
    })
    .catch(err => console.log(err))
  }

  const repost = async (created: boolean) => {
    const currentStory = seenStories[seenStories.length - 1]
    const newCurrentStory = { ...currentStory, reposted: created, reposts: created ? currentStory.reposts + 1 : currentStory.reposts - 1 }
    setSeenStories([
      ...seenStories,
      newCurrentStory
    ])
  }

  const favorite = async (created: boolean) => {
    const currentStory = seenStories[seenStories.length - 1]
    const newCurrentStory = { ...currentStory, favorited: created, favorites: created ? currentStory.favorites + 1 : currentStory.favorites - 1 }
    setSeenStories([
      ...seenStories,
      newCurrentStory
    ])
  }

  useEffect(() => {
    console.log(seenStories)
  },[seenStories])

  useEffect(() => {
    handleAuth()
    const tab: any = searchParams.get("tab")
    setStoriesType(getStoriesTypeFromName(tab))
    if (tab == 'friends') {
      getFriendStory()
    } else {
      getStory()
    }
  },[searchParams])

  const handleAuth = async () => {
    if (!await isLoggedIn()){
      navigate("/")
    }
  }

  return (
    <div className="w-screen">
      <LoginScreen/>
      <div className="flex justify-around mt-16 mlpage p-8">
        <div>
          <div className="justify-between flex pb-4">
            <Dropdown size={40} style={{ paddingLeft: "0px", fontWeight: 900, border: 'none', fontFamily: 'Cabin', backgroundColor: 'white' }} className="rounded-md bg-[white] text-xl font-cabin" label={storiesType.label} dismissOnClick={true}>
              {storiesTypes.map((storiesType) => (
                <Dropdown.Item
                  className="transition-all hover:text-[#668AE4] p-4 pt-2 pb-2 font-semibold font-cabin text-lg" 
                  onClick={() => {
                    setStoriesType(getStoriesTypeFromName(storiesType.name))
                    setSeenStories([])
                    setCurrIndex(0)
                    if (storiesType.name == 'foryou') {
                      getStory()
                    } else {
                      getFriendStory()
                    }
                  }}
                >
                  {storiesType.icon}
                  <p className="ml-2">{storiesType.label}</p>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <div className="flex pl-0 p-4">
            <div className="flex">
              {seenStories.length > 0 && seenStories[currIndex] ? (
                <StoryComponent className={animationLikes} onFavorite={favorite} onRepost={repost} story={seenStories[currIndex]}/>
              ):(
                <NotFound message="Non abbiamo trovato storie per te :(" />
              )}
              <div className="pl-4 h-96 flex items-center">
                <div>
                  <button onClick={() => {
                    setCurrIndex(currIndex - 1)
                    setTimeout(() => setAnimationLikes('goDown'), 0);
                    setTimeout(() => setAnimationLikes('waitUp'), 100);
                    setTimeout(() => setAnimationLikes('initial'), 200);
                  }} disabled={currIndex == 0} className="transition-all hover:hover:opacity-60 text-[#668AE4]">
                    <IoIosArrowDropup size={42}/>
                  </button>
                  <div className="font-cabin flex justify-around">
                    <p>{currIndex + 1}</p>
                  </div>
                  <button onClick={async () => {
                    if (currIndex == seenStories.length - 1) {
                      if (storiesType.name == 'foryou') {
                        await getStory()
                      } else {
                        await getFriendStory()
                      }
                    }
                    setCurrIndex(currIndex + 1)
                    setTimeout(() => setAnimationLikes('goUp'), 0);
                    setTimeout(() => setAnimationLikes('waitDown'), 100);
                    setTimeout(() => setAnimationLikes('initial'), 200);
                  }} className="transition-all hover:hover:opacity-60 text-[#668AE4]">
                    <IoIosArrowDropdown size={42}/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage