import Avatar from "boring-avatars"
import '../index.css'
import { RiSettings5Fill } from 'react-icons/ri'
import React, { useEffect, useState } from "react"
import { FaBookmark, FaRetweet } from "react-icons/fa6"
import { Story, Topic, User, UserStory } from "../../typos/interfaces"
import axios from "axios"
import { BASE_URL, getCookie } from "../../utils/api"
import { SpinnerCircular } from "spinners-react"
import { formatDate } from "../../utils/dates"
import { Link, useParams } from "react-router-dom"
import UserStoryComponent from "../../components/userstory"
import './index.css'
import NotFound from "../../components/notfound"
import OptionsScreen from "../../components/options_screen"
import { MdPeopleAlt } from "react-icons/md"
import StoryScreen from "../../components/story_screen"

interface UserPageProps{
  subPage: "stories" | "favorites"
}

const UserPage: React.FC<UserPageProps> = ( props ) => {
  
  const [user, setUser] = useState<User>()
  const [storyScreenVisible, setStoryScreenVisible] = useState(false)
  const [screenStory, setScreenStory] = useState<null | Story>(null)
  const [isSendingFriendLoading, setIsSendingFriendLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [error, setError] = useState(false)
  const [favoriteStories, setFavoriteStories] = useState<UserStory[]>()
  const [isRepostLoading, setIsRepostLoading] = useState(false)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  const [stories, setStories] = useState<UserStory[]>()
  const userId = useParams().userId
  const [isLoading, setIsLoading] = useState(false)

  const getUser = async () => {
    setIsLoading(true)
    await axios.get(
      BASE_URL + "/users/" + userId, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      setUser(res.data.param)
    })
    .catch(err => {
      setError(true)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    getUser()
    getStories()
  },[userId])

  const getStories = async () => {
    await axios.get(BASE_URL + "/stories/" + userId, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      setStories(res.data.param)
    })
    .catch(err => console.log(err))
  }
  
  const getFavoriteStories = async () => {
    await axios.get(BASE_URL + "/stories/" + userId + "/favorite", { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      setFavoriteStories(res.data.param)
    })
    .catch(err => console.log(err))
  }

  const createFriendRequest = async () => {
    setIsSendingFriendLoading(true)
    await axios.post(BASE_URL + "/friends/", { friend_id: userId }, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      if (user) {
        setUser({
          ...user,
          friend: {
            friendable: false,
            is_request_pending: true
          }
        })
        console.log({
          ...user,
          friend: {
            friendable: user?.friend.friendable,
            is_request_pending: true
          }
        })
      }
    })
    .catch(err => console.log(err))
    setIsSendingFriendLoading(false)
  }


  return (
    <>
      {showOptions &&
        <OptionsScreen onClose={(update) => {
          setShowOptions(false)
          if (update) {
            getUser()
          }
        }}/>
      }
      {storyScreenVisible &&
        <StoryScreen onClose={() => setStoryScreenVisible(false)} story={screenStory} />
      }
      <div className="pt-0 mlpage">
        {isLoading ? (
          <div className="items-center justify-around flex">
            <SpinnerCircular
              color="#668AE4"
              speed={254}
              thickness={154}
              secondaryColor="transparent"
            />
          </div>
        ):(
          error ? (
            <NotFound/>
          ):(
            <div>
              <div className="z-20 block-none pb-8 top-8 p-14 bg-[white] w-full fixed">
                <div className="flex">
                  <div className="pr-8 center flex">
                    <Avatar
                      size={124}
                      name={user?.anonymous_name}
                      variant="beam"
                      colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
                    />
                  </div>
                  <div className="center flex">
                    <div>
                      <div className="flex">
                        <h2 className="text-xl font-semibold font-cabin">{user?.anonymous_name}</h2>
                        {!user?.friend.is_request_pending && !user?.friend.friendable ? (
                          <div className="rounded-md text-xs bg-[#668AE4] bg-opacity-20 ml-4 font-semibold items-center flex font-cabin pr-2 pl-2 text-[#668AE4]">
                            <MdPeopleAlt size={18} />
                            <p className="pl-1">Friends</p>
                          </div>
                        ): null}
                      </div>
                      <p className="mt-1 text-md text-[gray] font-cabin">{user?.bio}</p>
                      <p className="mt-3 text-sm text-[gray] font-cabin">On Judjen from {formatDate(user?.created_on)}</p>
                    </div>
                  </div>
                  <div className="pl-14 items-center justify-around flex">
                    {user?.own ? (
                      <div className="block-none ml-14">
                        <button onClick={() => setShowOptions(true)}><RiSettings5Fill color="#d4d4d4" size={24}/></button>
                      </div>
                    ) : (
                      user?.friend.friendable ? (
                        <div>
                          {isSendingFriendLoading ? (
                            <button disabled onClick={() => createFriendRequest()} className="rounded-md text-[white] font-cabin bg-[#668AE4] pr-6 pl-6 p-3" >
                              <SpinnerCircular
                                color="white"
                                speed={254}
                                size={24}
                                thickness={154}
                                secondaryColor="transparent"
                              />
                            </button>
                          ):(
                            <button onClick={() => createFriendRequest()} className="hover:bg-[#4C73D5] rounded-md text-[white] font-cabin bg-[#668AE4] pr-6 pl-6 p-3" >Add Friend</button>
                          )}
                        </div>
                      ) : (
                        user?.friend.is_request_pending ? (
                          <div>
                            <button disabled onClick={() => {}} className="border-2 rounded-md text-[#668AE4] font-cabin border-[#668AE4] pr-6 pl-6 p-3" >Pending Request</button>
                          </div>
                        ) : null
                      )
                    )}
                  </div>
                </div>
                <div className="mt-8 flex">
                  <ul className="gap-3 flex">
                    {props.subPage == 'stories' ? (
                      <li className="cursor-pointer text-sm border-b-2 border-[#668AE4] border-b p-2">
                        <p>Stories</p>
                      </li>
                    ):(
                      <Link onClick={() => getStories()} to={"/user/" + userId}>
                        <li className="cursor-pointer transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                          <p>Stories</p>
                        </li>
                      </Link>
                    )}
                    {props.subPage == 'favorites' ? (
                      <li className="cursor-pointer flex text-sm border-b-2 border-[#668AE4] border-b p-2">
                        <p>Favorite Stories</p>
                      </li>
                    ):(
                      <Link onClick={() => getFavoriteStories()} to={"/user/" + userId + "/favorites"}>
                        <li className="cursor-pointer flex transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                          <p>Favorite Stories</p>
                        </li>
                      </Link>
                    )}
                  </ul>
                </div>
              </div>
              <div className="none-block pl-4 pb-8 top-0 p-14 bg-[white] w-4/5 z-20 fixed">
                <div className="flex">
                  {user?.own ? (
                    <div className="block-none ml-14">
                      <button onClick={() => setShowOptions(true)}><RiSettings5Fill color="#d4d4d4" size={24}/></button>
                    </div>
                  ) : (
                    user?.friend.friendable ? (
                      <div>
                        {isSendingFriendLoading ? (
                          <button disabled className="text-sm hover:bg-[#4C73D5] rounded-md text-[white] font-cabin bg-[#668AE4] pr-3 pl-3 p-1" >
                            <SpinnerCircular
                              color="white"
                              speed={254}
                              size={24}
                              thickness={154}
                              secondaryColor="transparent"
                            />
                          </button>
                        ):(
                          <button onClick={() => createFriendRequest()} className="text-sm hover:bg-[#4C73D5] rounded-md text-[white] font-cabin bg-[#668AE4] pr-3 pl-3 p-1" >Add Friend</button>
                        )}
                      </div>
                    ) : (
                      user?.friend.is_request_pending ? (
                        <div>
                          <button disabled onClick={() => {}} className="text-sm border-2 rounded-md text-[#668AE4] font-cabin border-[#668AE4] pr-3 pl-3 p-1" >Pending Request</button>
                        </div>
                      ) : (
                        <div className="pb-1 pt-1 rounded-md text-xs bg-[#668AE4] bg-opacity-20 font-semibold items-center flex font-cabin pr-2 pl-2 text-[#668AE4]">
                          <MdPeopleAlt size={18} />
                          <p className="pl-1">Friends</p>
                        </div>
                      )
                    )
                  )}
                  <div className="mt-2 flex">
                    <Avatar
                      size={54}
                      name={user?.anonymous_name}
                      variant="beam"
                      colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
                    />
                    <div className="ml-2">
                      <h2 className="text-md font-semibold font-cabin">{user?.anonymous_name}</h2>
                      <p className="mt-1 text-sm text-[gray] font-cabin">{user?.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex">
                  <ul className="gap-3 flex">
                    {props.subPage == 'stories' ? (
                      <li className="cursor-pointer text-sm border-b-2 border-[#668AE4] border-b p-2">
                        <p>Stories</p>
                      </li>
                    ):(
                      <Link onClick={() => getStories()} to={"/user/" + userId}>
                        <li className="cursor-pointer transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                          <p>Stories</p>
                        </li>
                      </Link>
                    )}
                    {props.subPage == 'favorites' ? (
                      <li className="cursor-pointer flex text-sm border-b-2 border-[#668AE4] border-b p-2">
                        <p>Favorite Stories</p>
                      </li>
                    ):(
                      <Link onClick={() => getFavoriteStories()} to={"/user/" + userId + "/favorites"}>
                        <li className="cursor-pointer flex transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                          <p>Favorite Stories</p>
                        </li>
                      </Link>
                    )}
                  </ul>
                </div>
              </div>
              <div className="z-10 pluserstory mtuserstory pt-10">
                {props.subPage == 'stories' ? (
                  <div style={{ maxWidth: 1000 }} className="flex-wrap flex mt-4">
                    {stories && stories.length > 0 ? (
                      stories?.map((story: UserStory) => (
                        <UserStoryComponent
                          onOpen={() => {
                            setStoryScreenVisible(true)
                            setScreenStory(story)
                          }}
                          onRepost={() => getStories()}
                          showRepost={true}
                          onFavorite={() => getStories()}
                          story={story} />
                      ))
                    ):(
                      <NotFound/>
                    )}
                  </div>
                ):(
                  props.subPage == 'favorites' ? (
                    <div style={{ maxWidth: 1000 }} className="flex-wrap flex mt-4">
                      {favoriteStories && favoriteStories.length > 0 ? (
                        favoriteStories?.map((story: UserStory) => (
                          <UserStoryComponent
                            onOpen={() => {
                              setStoryScreenVisible(true)
                              setScreenStory(story)
                            }}
                            onRepost={() => getFavoriteStories()}
                            showRepost={false}
                            onFavorite={() => getFavoriteStories()}
                            story={story} />
                        ))
                      ):(
                        <NotFound/>
                      )}
                    </div>
                  ):(
                    <></>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </>
  )
}

export default UserPage