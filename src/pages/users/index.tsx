import Avatar from "boring-avatars"
import React, { useEffect, useState } from "react"
import { FaBookmark, FaRetweet } from "react-icons/fa6"
import { Story, StorySchema, Topic, User, UserStory } from "../../typos/interfaces"
import axios from "axios"
import { BASE_URL, getCookie } from "../../utils/api"
import { SpinnerCircular } from "spinners-react"
import { formatDate } from "../../utils/dates"
import { Link, useParams } from "react-router-dom"
import UserStoryComponent from "../../components/userstory"
import NotFound from "../../components/notfound"

interface UserPageProps{
  subPage: "stories" | "favorites"
}

const UserPage: React.FC<UserPageProps> = ( props ) => {
  
  const [user, setUser] = useState<User>()
  const [favoriteStories, setFavoriteStories] = useState<UserStory[]>()
  const [isRepostLoading, setIsRepostLoading] = useState(false)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  const [stories, setStories] = useState<UserStory[]>()
  const userId = useParams().userId
  const [isLoading, setIsLoading] = useState(false)

  const getUser = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/users/" + userId, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      setUser(res.data.param)
    })
    .catch(err => console.log(err))
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

  return (
    <div className="p-14">
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
        <div>
          <div className="flex">
            <div className="items-center justify-around flex">
              <Avatar
                size={124}
                name={"props.friend.anonymous_name"}
                variant="beam"
                colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
              />
            </div>
            <div className="items-center flex pl-8">
              <div>
                <h2 className="text-xl font-semibold font-cubito">{user?.anonymous_name}</h2>
                <p className="mt-1 text-md text-[gray] font-cubito">{user?.bio}</p>
                <p className="mt-3 text-sm text-[gray] font-cubito">On Judjen from {formatDate(user?.created_on)}</p>
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
          {props.subPage == 'stories' ? (
            <div className="mt-4">
              {stories && stories.length > 0 ? (
                stories?.map((story: UserStory) => (
                  <UserStoryComponent
                    onRepost={() => getStories()}
                    onFavorite={() => getStories()}
                    story={story} />
                ))
              ):(
                <NotFound/>
              )}
            </div>
          ):(
            props.subPage == 'favorites' ? (
              <div className="mt-4">
                {favoriteStories && favoriteStories.length > 0 ? (
                  favoriteStories?.map((story: UserStory) => (
                    <UserStoryComponent
                      onRepost={() => getFavoriteStories()}
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
      )}
    </div>
  )
}

export default UserPage