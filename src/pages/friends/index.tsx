import Avatar from "boring-avatars"
import { useState } from "react"
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io"
import { Link } from "react-router-dom"

interface FriendsProps{
  subpage: "friends" | "sent_requests" | "received_requests"
}

const Friends: React.FC<FriendsProps> = ( props ) => {

  const [newFriend, setNewFriend] = useState("")

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
              <Link to={"/friends/requests/sent"}>
                <li className="cursor-pointer flex transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                  <p>Sent Requests</p>
                </li>
              </Link>
            )}
            {props.subpage == 'received_requests' ? (
              <li className="cursor-pointer flex text-sm border-b-2 border-[#668AE4] border-b p-2">
                <p>Received Requests</p>
                <p className="ml-2 font-semibold text-[#668AE4]" >+2</p>
              </li>
            ):(
              <Link to={"/friends/requests/received"}>
                <li className="cursor-pointer flex transition-all text-sm hover:border-b-2 hover:border-[#668AE4] p-2">
                  <p>Received Requests</p>
                  <p className="ml-2 font-semibold text-[#668AE4]" >+2</p>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        {props.subpage == 'friends' ? (
          <div>
            <div className="p-2">
              <div className="rounded-lg flex p-4 border">
                <div className="items-center justify-around flex">
                  <Avatar
                    size={40}
                    name="Maria Mitchell"
                    variant="marble"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                </div>
                <div className="pl-2">
                  <p className="font-semibold font-cubito">User 4545</p>
                  <p className="text-[gray] font-cubito">fdgdfg fdgdfg df gdf gdfgdfgdf</p>
                </div>
              </div>
            </div>
          </div>
        ):(
          props.subpage == 'sent_requests' ? (
            <div>
              <div>
                <input onChange={(e) => setNewFriend(e.target.value)} value={newFriend} placeholder="Add friend..." className="rounded-md p-2 border bg-[#fefefe]" type="text" />
                <div className="rounded-md mt-2 p-4 bg-[#fafafa] border" style={{ display: newFriend != "" ? 'block' : "none" }}>
                  <div className="p-2">
                    <div className="bg-[white] rounded-lg flex p-4 border">
                      <div className="items-center justify-around flex">
                        <Avatar
                          size={40}
                          name="Maria Mitchell"
                          variant="marble"
                          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                        />
                      </div>
                      <div className="pl-2">
                        <p className="font-semibold font-cubito">User 4545</p>
                        <p className="text-[gray] font-cubito">fdgdfg fdgdfg df gdf gdfgdfgdf</p>
                      </div>
                      <div className="pl-4 items-center justify-around flex">
                        <div><button><IoIosAddCircleOutline color="green" size={24}/></button></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="pl-0 p-2">
                  <div className="rounded-lg flex p-4 border">
                    <div className="items-center justify-around flex">
                      <Avatar
                        size={40}
                        name="Maria Mitchell"
                        variant="marble"
                        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                      />
                    </div>
                    <div className="pl-2">
                      <p className="font-semibold font-cubito">User 4545</p>
                      <p className="text-[gray] font-cubito">fdgdfg fdgdfg df gdf gdfgdfgdf</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ):(
            props.subpage == 'received_requests' ? (
              <div>
                <div className="pl-0 p-2">
                  <div className="rounded-lg flex p-4 border">
                    <div className="items-center justify-around flex">
                      <Avatar
                        size={40}
                        name="Maria Mitchell"
                        variant="marble"
                        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                      />
                    </div>
                    <div className="pl-2">
                      <p className="font-semibold font-cubito">User 4545</p>
                      <p className="text-[gray] font-cubito">fdgdfg fdgdfg df gdf gdfgdfgdf</p>
                    </div>
                    <div className="pl-4 items-center justify-around flex">
                      <div className="flex">
                        <div className="pr-2"><button><IoIosAddCircleOutline color="green" size={24}/></button></div>
                        <div><button><IoIosRemoveCircleOutline color="red" size={24}/></button></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ):(
            null
          )
        ))}
      </div>
    </div>
  )
}
  
export default Friends