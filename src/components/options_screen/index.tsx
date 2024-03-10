import React, { useEffect, useState } from "react"
import { BASE_URL, getCookie, getUser, isLoggedIn, setCookie } from "../../utils/api"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { IoClose, IoDice } from "react-icons/io5"
import { SpinnerCircular } from "spinners-react"
import { isPropertySignature } from "typescript"

interface OptionsScreenProps{
  onClose: (update: boolean) => void
}

const OptionsScreen: React.FC<OptionsScreenProps> = ( props ) => {

  const [request, setRequest] = useState({
    email: '',
    bio: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRequest = (e: any) => {
    const newRequest: any = { ...request }
    newRequest[e.target.name] = e.target.value
    setRequest(newRequest)
  }

  const takeUser = async () => {
    const user: any = await getUser()
    setRequest({
      ...request,
      email: user.email,
      bio: user.bio
    })
  }

  const change = async (e: any) => {
    e.preventDefault()
    await axios.put(BASE_URL + "/users/", request, { headers: { Authorization: 'Bearer ' + getCookie("jwt-token") } })
    .then(res => props.onClose(true))
    .catch(err => err)
  }

  useEffect(() => {
    takeUser()
  },[])

  return(
    <div className="fixed z-50 items-center justify-around flex backdrop-blur-sm h-screen w-screen">
      <div className="border p-4 rounded-md bg-[white]">
        <div className="items-center justify-between flex pb-2 border-b">
          <h2 className="font-semibold text-xl font-cabin">Il tuo Account</h2>
          <button onClick={() => props.onClose(false)} ><IoClose size={24} color="#d4d4d4" /></button>
        </div>
        <form onSubmit={(e) => change(e)} action="">
          <div className="mt-4">
            <div className="mt-2">
              <div>
                <label className="font-cabin" htmlFor="email">Email</label>
              </div>
              <div className="mt-1">
                <input 
                  disabled
                  value={request.email} 
                  name="email" 
                  className="w-64 rounded-md p-2 border" 
                  type="text"
                />
              </div>
            </div>
            <div className="mt-2">
              <div>
                <label className="font-cabin" htmlFor="email">Bio</label>
              </div>
              <div className="mt-1">
                <input 
                  onChange={(e) => handleRequest(e)} 
                  value={request.bio} 
                  name="bio" 
                  placeholder="Hey, I'm an anonymous human being, maybe?"
                  className="w-64 rounded-md p-2 border" 
                  type="text"
                />
              </div>
            </div>
            <div className="mt-2">
              <div>
                <label className="font-cabin" htmlFor="title">Password</label>
              </div>
              <div className="mt-1">
                <input 
                  onChange={(e) => handleRequest(e)} 
                  value={request.password} 
                  name="password" 
                  placeholder="********" 
                  className="w-64 rounded-md p-2 border" 
                  type="password" 
                />
              </div>
            </div>
          </div>
          <div className="pt-1">
            <h2 className="text-xs text-[red] font-cabin">{error}</h2>
          </div>
          <div className="mt-8 items-center justify-between flex">
            <div></div>
            {request.password == "" || request.password.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$") ? (
              isLoading ? (
                <button
                  disabled
                  className="rounded-md text-[white] font-cabin bg-[#668AE4] pr-6 pl-6 p-3" >
                  <SpinnerCircular
                    color="white"
                    speed={254}
                    size={24}
                    thickness={184}
                    secondaryColor="transparent"
                  />
                </button>
              ):(
                <button 
                  className="transition-all hover:bg-[#4C73D5] rounded-md text-[white] 
                  font-cabin bg-[#668AE4] pr-6 pl-6 p-3" 
                >
                  Cambia
                </button>
              )
            ):(
              <button
                disabled
                className="transition-all rounded-md text-[white] 
                font-cabin bg-[#668AE4] pr-6 pl-6 p-3" 
              >
                Cambia
              </button>
            )}
          </div>
        </form>
      </div>
    </div> 
  )

}

export default OptionsScreen