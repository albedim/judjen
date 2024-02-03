import Avatar from "boring-avatars"
import { useEffect, useState } from "react"
import { FaBookmark, FaRetweet } from "react-icons/fa6"
import { Story, StorySchema, Topic } from "../../typos/interfaces"
import axios from "axios"
import { BASE_URL, getCookie } from "../../utils/api"
import { SpinnerCircular } from "spinners-react"
import LoginScreen from "../../components/login_screen"

const HomePage = () => {

  const [story, setStory] = useState<Story>(StorySchema)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  const [isRepostLoading, setIsRepostLoading] = useState(false)

  const getStory = async () => {
    await axios.get(BASE_URL + "/stories/", { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => setStory(res.data.param))
    .catch(err => console.log(err))
  }

  const repost = async () => {
    setIsRepostLoading(true)
    await axios.post(BASE_URL + "/reposts/", {story_id: story?.story_id }, { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => setStory({ 
      ...story, 
      reposted: res.data.param.created,
      reposts: res.data.param.created ? story.reposts + 1 : story.reposts - 1
    }))
    .catch(err => console.log(err))
    setIsRepostLoading(false)
  }

  const favorite = async () => {
    setIsFavoriteLoading(true)
    await axios.post(BASE_URL + "/favorites/", {story_id: story?.story_id }, { headers: { Authorization: 'Bearer ' + getCookie('jwt-token') } })
    .then(res => setStory({ 
      ...story, 
      favorited: res.data.param.created,
      favorites: res.data.param.created ? story.favorites + 1 : story.favorites - 1
    }))
    .catch(err => console.log(err))
    setIsFavoriteLoading(false)
  }

  useEffect(() => {
    getStory()
  },[])

  console.log(story?.topics)

  return (
    <>
      <LoginScreen/>
      <div className="p-8">
        <div>
          <h1 className="text-xl font-semibold font-cubito" >Stories</h1>
        </div>
        <div className="pl-0 p-4">
          {story ? (
            <div style={{ width: 450 }} className="p-4 rounded-md border">
              <div className="flex">
                {story.topics.map((topic: Topic) => (
                  <div className="pl-0 p-1">
                    <div style={{ paddingBottom: 2, paddingTop: 2 }} className="items-center flex text-xs font-cubito text-[white] pr-2 pl-2 rounded-md bg-[#668AE4]">
                      <p>{topic.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h1 className="mt-2 font-semibold text-xl font-cubito">{story.title}</h1>
              <div className="items-center flex">
                <div>
                  <Avatar
                    size={14}
                    name={story.user.anonymous_name}
                    variant="beam"
                    colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
                  />
                </div>
                <div className="pl-2"><p className="text-[gray] hover:underline font-cubito">{story.user.anonymous_name}</p></div>
              </div>
              <div className="mt-4">
                <p>{story.content}</p>
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
                    <div style={{ color: story.reposted ? '#668AE4' : 'gray' }} className="transition-all hover:opacity-60 cursor-pointer items-center flex">
                      <div><FaRetweet size={18} /></div>
                      <p className="pl-2 font-semibold ">{story.reposts}</p>
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
                    <div style={{ color: story.favorited ? '#668AE4' : 'gray' }} className="transition-all hover:opacity-60 cursor-pointer items-center flex">
                      <div><FaBookmark size={16} /></div>
                      <p className="pl-2 font-semibold ">{story.favorites}</p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          ):(
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage