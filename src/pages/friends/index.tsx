import Avatar from "boring-avatars"
import { useEffect, useState } from "react"
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { SpinnerCircular } from "spinners-react"
import { Friend, ReceivedFriendRequest, SentFriendRequest } from "../../typos/interfaces"
import axios from "axios"
import { PiSmileySadLight } from 'react-icons/pi'
import { BASE_URL, getCookie, isLoggedIn, setCookie } from "../../utils/api"
import NotFound from "../../components/notfound"
import { FaRegTrashCan } from "react-icons/fa6"
import FriendComponent from "../../components/user/friend"
import SentFriendRequestComponent from "../../components/user/sent_request_friend"
import ReceivedFriendRequestComponent from "../../components/user/received_request_friend"
import { cutString } from "../../utils/str"

interface FriendsProps{
  subpage: "friends" | "sent_requests" | "received_requests"
}

const Friends: React.FC<FriendsProps> = ( props ) => {

  const [newFriend, setNewFriend] = useState("")
  const [isRemovingFriendLoading, setIsRemovingFriendLoading] = useState(false)
  const navigate = useNavigate()
  const [receivedFriendRequestsN, setReceivedFriendRequestsN] = useState(0)
  const [users, setUsers] = useState<Friend[]>([])
  const [friends, setFriends] = useState<undefined | Friend[]>([])
  const [sentFriendRequests, setSentFriendRequests] = useState<undefined | SentFriendRequest[]>([])
  const [receivedFriendRequests, setReceivedFriendRequests] = useState<undefined | ReceivedFriendRequest[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    handleAuth()
    getFriends()
  },[])

  const getFriends = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/friends/", { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      setFriends(res.data.param.friends)
      setReceivedFriendRequestsN(res.data.param.received_friend_requests)
    })
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  const getSentFriendRequests = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/friends/sent", { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      setSentFriendRequests(res.data.param)
    })
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  const createFriendRequest = async (friendId: string) => {
    setIsLoading(true)
    await axios.post(BASE_URL + "/friends/", { friend_id: friendId }, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      setNewFriend("")
      getSentFriendRequests()
    })
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  const getReceivedFriendRequests = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/friends/received", { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      setReceivedFriendRequests(res.data.param)
    })
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  const getUsers = async (name: string) => {
    await axios.get(BASE_URL + "/users/query?name=" + name, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => setUsers(res.data.param))
    .catch(err => console.log(err))
  }

  const handleAuth = async () => {
    if (!await isLoggedIn()){
      navigate("/")
    }
  }

  return (
    <div className="p-8">
      <div className="pb-4">
        <h1 className="text-xl font-semibold font-cubito" >Friends</h1>
      </div>
      <div>
        <div>
          <ul className="gap-3 flex">
            {props.subpage == 'friends' ? (
              <li className="cursor-pointer text-sm border-b-2 border-[#668AE4] border-b p-2">
                <p>Friends</p>
              </li>
            ):(
              <Link onClick={() => getFriends()} to={"/friends"}>
                <li className="cursor-pointer transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                  <p>Friends</p>
                </li>
              </Link>
            )}
            {props.subpage == 'sent_requests' ? (
              <li className="cursor-pointer flex text-sm border-b-2 border-[#668AE4] border-b p-2">
                <p>Sent Requests</p>
              </li>
            ):(
              <Link onClick={() => getSentFriendRequests()} to={"/friends/requests/sent"}>
                <li className="cursor-pointer flex transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                  <p>Sent Requests</p>
                </li>
              </Link>
            )}
            {props.subpage == 'received_requests' ? (
              <li className="cursor-pointer flex text-sm border-b-2 border-[#668AE4] border-b p-2">
                <p>Received Requests</p>
                {receivedFriendRequestsN > 0 ? (
                  <p className="ml-2 font-semibold text-[#668AE4]" >+{receivedFriendRequestsN}</p>
                ) : null}
              </li>
            ):(
              <Link onClick={() => getReceivedFriendRequests()} to={"/friends/requests/received"}>
                <li className="cursor-pointer flex transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                  <p>Received Requests</p>
                  {receivedFriendRequestsN > 0 ? (
                    <p className="ml-2 font-semibold text-[#668AE4]" >+{receivedFriendRequestsN}</p>
                  ) : null}
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-8">
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
          props.subpage == 'friends' ? (
            <div>
              {friends && friends.length > 0 ? (
                friends?.map((friend: Friend) => (
                  <FriendComponent setFriends={(res) => setFriends(res)} friend={friend} />
                ))
              ):(
                <NotFound/>
              )}
            </div>
          ):(
            props.subpage == 'sent_requests' ? (
              <div>
                <div>
                  <input onChange={(e) => {
                    getUsers(e.target.value)
                    setNewFriend(e.target.value)
                  }} value={newFriend} placeholder="Add friend..." className="rounded-md p-2 border bg-[#fefefe]" type="text" />
                  <div className="pl-2 rounded-md mt-2 p-4 bg-[#fafafa] border" style={{ display: newFriend != "" ? 'block' : "none" }}>
                    {users.map((user: Friend) => (
                      <div className="pb-2">
                        <div className="bg-[white] rounded-lg flex p-4 border">
                          <div className="items-center justify-around flex">
                            <Avatar
                              size={40}
                              name="Maria Mitchell"
                              variant="beam"
                              colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
                            />
                          </div>
                          <div className="pl-2">
                            <p className="text-md font-semibold font-cubito">{user.anonymous_name}</p>
                            <p className="text-sm text-[gray] font-cubito">{cutString(user.bio)}</p>
                          </div>
                          <div className="pl-4 items-center justify-around flex">
                            <div><button onClick={() => createFriendRequest(user.user_id)} ><IoIosAddCircleOutline color="green" size={24}/></button></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <div className="border-b pb-2">
                    <h2 className="text-md font-semibold font-cubito" >Pending requests</h2>
                  </div>
                  <div className="mt-4">
                    {sentFriendRequests && sentFriendRequests.length > 0 ? (
                      sentFriendRequests?.map((friend: SentFriendRequest) => (
                        <SentFriendRequestComponent friend={friend}/>
                      ))
                    ):(
                      <NotFound/>
                    )}
                  </div>
                </div>
              </div>
            ):(
              props.subpage == 'received_requests' ? (
                <div>
                  {receivedFriendRequests && receivedFriendRequests.length > 0 ? (
                    receivedFriendRequests?.map((friend: ReceivedFriendRequest) => (
                      <ReceivedFriendRequestComponent onAction={() => getReceivedFriendRequests()} friend={friend} />
                    ))
                  ):(
                    <NotFound/>
                  )}
                </div>
            ):(
              null
            )
          ))
        )}
      </div>
    </div>
  )
}
  
export default Friends