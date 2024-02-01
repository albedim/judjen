import Avatar from "boring-avatars"
import { useEffect, useState } from "react"
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { SpinnerCircular } from "spinners-react"
import { Friend } from "../../typos/interfaces"
import axios from "axios"
import { BASE_URL, getCookie, isLoggedIn, setCookie } from "../../utils/api"

interface FriendsProps{
  subpage: "friends" | "sent_requests" | "received_requests"
}

const Friends: React.FC<FriendsProps> = ( props ) => {

  const [newFriend, setNewFriend] = useState("")
  const navigate = useNavigate()
  const [receivedFriendRequestsN, setReceivedFriendRequestsN] = useState(0)
  const [friends, setFriends] = useState<undefined | Friend[]>([])
  const [sentFriendRequests, setSentFriendRequests] = useState<undefined | Friend[]>([])
  const [receivedFriendRequests, setReceivedFriendRequests] = useState<undefined | Friend[]>([])
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
      setReceivedFriendRequestsN(res.data.received_friend_requests)
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

  const getReceivedFriendRequests = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/friends/received", { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => {
      setReceivedFriendRequests(res.data.param)
    })
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  const acceptRequest = async ( userId: string ) => {
    setIsLoading(true)
    await axios.post(BASE_URL + "/friends/accept", { user_id: userId }, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => getReceivedFriendRequests())
    .catch(err => console.log(err))
    setIsLoading(false)
  }

  const rejectRequest = async ( userId: string ) => {
    setIsLoading(true)
    await axios.post(BASE_URL + "/friends/reject", { user_id: userId }, { headers: { Authorization: "Bearer " + getCookie("jwt-token") } })
    .then(res => getReceivedFriendRequests())
    .catch(err => console.log(err))
    setIsLoading(false)
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
              <Link to={"/friends"}>
                <li onClick={() => getSentFriendRequests()} className="cursor-pointer transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                  <p>Friends</p>
                </li>
              </Link>
            )}
            {props.subpage == 'sent_requests' ? (
              <li className="cursor-pointer flex text-sm border-b-2 border-[#668AE4] border-b p-2">
                <p>Sent Requests</p>
              </li>
            ):(
              <Link to={"/friends/requests/sent"}>
                <li onClick={() => getSentFriendRequests()} className="cursor-pointer flex transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                  <p>Sent Requests</p>
                </li>
              </Link>
            )}
            {props.subpage == 'received_requests' ? (
              <li className="cursor-pointer flex text-sm border-b-2 border-[#668AE4] border-b p-2">
                <p>Received Requests</p>
                <p className="ml-2 font-semibold text-[#668AE4]" >+{receivedFriendRequestsN}</p>
              </li>
            ):(
              <Link to={"/friends/requests/received"}>
                <li onClick={() => getReceivedFriendRequests()} className="cursor-pointer flex transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                  <p>Received Requests</p>
                  <p className="ml-2 font-semibold text-[#668AE4]" >+{receivedFriendRequestsN}</p>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        {isLoading ? (
          <div>
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
              {friends?.map((friend: Friend) => (
                <div className="pb-2">
                  <div className="rounded-lg flex p-4 border">
                    <div className="items-center justify-around flex">
                      <Avatar
                        size={40}
                        name={friend.anonymous_name}
                        variant="beam"
                        colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
                      />
                    </div>
                    <div className="pl-2">
                      <p className="text-md font-semibold font-cubito">{friend.anonymous_name}</p>
                      <p className="text-sm text-[gray] font-cubito">Friends from {friend.friended_on}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ):(
            props.subpage == 'sent_requests' ? (
              <div>
                <div>
                  <input onChange={(e) => setNewFriend(e.target.value)} value={newFriend} placeholder="Add friend..." className="rounded-md p-2 border bg-[#fefefe]" type="text" />
                  <div className="pl-2 rounded-md mt-2 p-4 bg-[#fafafa] border" style={{ display: newFriend != "" ? 'block' : "none" }}>
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
                          <p className="text-md font-semibold font-cubito">User 4545</p>
                          <p className="text-sm text-[gray] font-cubito">fdgdfg fdgdfg df gdf gdfgdfgdf</p>
                        </div>
                        <div className="pl-4 items-center justify-around flex">
                          <div><button><IoIosAddCircleOutline color="green" size={24}/></button></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  {sentFriendRequests?.map((friend: Friend) => (
                    <div className="pb-2">
                      <div className="rounded-lg flex p-4 border">
                        <div className="items-center justify-around flex">
                          <Avatar
                            size={40}
                            name="Maria Mitchell"
                            variant="beam"
                            colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
                          />
                        </div>
                        <div className="pl-2">
                          <p className="text-md font-semibold font-cubito">{friend.anonymous_name}</p>
                          <p className="text-sm text-[gray] font-cubito">{friend.created_on}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ):(
              props.subpage == 'received_requests' ? (
                <div>
                  {receivedFriendRequests?.map((friend: Friend) => (
                    <div className="pb-2">
                      <div className="justify-between rounded-lg flex p-4 border">
                        <div className="flex">
                          <div className="items-center justify-around flex">
                            <Avatar
                              size={40}
                              name="Maria Mitchell"
                              variant="beam"
                              colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
                            />
                          </div>
                          <div className="pl-2">
                            <p className="text-md font-semibold font-cubito">{friend.anonymous_name}</p>
                            <p className="text-sm text-[gray] font-cubito">Asked on {friend.created_on}</p>
                          </div>
                        </div>
                        <div className="pl-4 items-center justify-around flex">
                          <div className="flex">
                            <div className="pr-2"><button onClick={() => acceptRequest(friend.user_id)} ><IoIosAddCircleOutline color="green" size={24}/></button></div>
                            <div><button><IoIosRemoveCircleOutline color="red" size={24}/></button></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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