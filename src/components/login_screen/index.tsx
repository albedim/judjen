import { useEffect, useState } from "react"
import { BASE_URL, isLoggedIn, setCookie } from "../../utils/api"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { IoDice } from "react-icons/io5"

const LoginScreen = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [request, setRequest] = useState({
    email: '',
    password: ''
  })
  const [signupRequest, setSignupRequest] = useState({
    email: '',
    password: '',
    bio: '',
    anonymous_name: ''
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [page, setPage] = useState<"signin" | "signup">("signup")

  useEffect(() => {
    handleAuth()
    generateName()
  },[])

  const handleAuth = async () => {
    setLoggedIn(await isLoggedIn())
  }

  const generateName = () => {
    const namesWithoutNumbers = [
      "Cipher",
      "Shadow",
      "Phantom",
      "Ghost",
      "Silhouette",
      "Enigma",
      "Spectre",
      "Masked",
      "Stealth",
      "Incognito",
      "Mystery",
      "Eclipse",
      "Whisper",
      "Nebula",
      "Shrouded"
    ];

    const firstNames = [
      "Abigail",
      "Benjamin",
      "Charlotte",
      "Daniel",
      "Emily",
      "Finnley",
      "Grace",
      "Henry",
      "Isabella",
      "Jackson",
      "Kayla",
      "Liam",
      "Madison",
      "Noah",
      "Olivia",
      "Peyton",
      "Quinn",
      "Riley",
      "Sophia",
      "Tyler",
      "Victoria",
      "William",
      "Zoey",
      "Aiden",
      "Brooke",
      "Caleb",
      "Daisy",
      "Ethan",
      "Gavin",
      "Hailey",
      "Isaac",
      "Jasmine",
      "Kyle",
      "Lily",
      "Mason",
      "Natalie",
      "Owen",
      "Zachary"
    ];

    setSignupRequest({ ...signupRequest, anonymous_name: namesWithoutNumbers[Math.floor(Math.random() * namesWithoutNumbers.length)] + " " +
          firstNames[Math.floor(Math.random() * firstNames.length)]})
  }

  const handleRequest = (e: any) => {
    const newRequest: any = { ...request }
    newRequest[e.target.name] = e.target.value
    setRequest(newRequest)
  }

  const handleSignupRequest = (e: any) => {
    const newRequest: any = { ...signupRequest }
    newRequest[e.target.name] = e.target.value
    setSignupRequest(newRequest)
  }

  const login = async (e: any) => {
    e.preventDefault()
    await axios.post(BASE_URL + "/users/signin", request)
    .then(res => {
      setCookie("jwt-token", res.data.param.token, 14)
      navigate(0)
    })
    .catch(err => setError(err.response.data.error.message))
  }

  const signup = async () => {
    await axios.post(BASE_URL + "/users/signup", signupRequest)
    .then(res => {
      setCookie("jwt-token", res.data.param.token, 14)
      navigate(0)
    })
    .catch(err => setError(err.response.data.error.message))
  }

  if (!loggedIn) {
    if (page == 'signin') {
      return(
        <div className="items-center justify-around flex backdrop-blur-sm absolute h-screen w-screen">
          <div className="border p-4 rounded-md bg-[white]">
            <div className="pb-2 border-b">
              <h2 className="font-semibold text-xl font-cubito">Log in</h2>
            </div>
            <form onSubmit={(e) => login(e)} action="">
              <div className="mt-4">
                <div className="mt-2">
                  <div><label className="font-cubito" htmlFor="email">Email</label></div>
                  <div className="mt-1"><input onChange={(e) => handleRequest(e)} value={request.email} name="email" placeholder="email@example.com" className="w-64 rounded-md p-2 border" type="text" /></div>
                </div>
                <div className="mt-2">
                  <div><label className="font-cubito" htmlFor="title">Password</label></div>
                  <div className="mt-1"><input onChange={(e) => handleRequest(e)} value={request.password} name="password" placeholder="********" className="w-64 rounded-md p-2 border" type="password" /></div>
                </div>
              </div>
              <div className="pt-1">
                <h2 className="text-xs text-[red] font-cubito">{error}</h2>
              </div>
              <div className="mt-8 items-center justify-between flex">
                <div></div>
                { true ? (
                  <button className="hover:bg-[#4C73D5] rounded-md text-[white] font-cubito bg-[#668AE4] pr-6 pl-6 p-3" >Log In</button>
                ):(
                  <button disabled className="rounded-md text-[white] font-cubito bg-[#668AE4] pr-6 pl-6 p-3" >Log In</button>
                )}
              </div>
            </form>
          </div>
        </div> 
      )
    }
    return(
      <div className="items-center justify-around flex backdrop-blur-sm absolute h-screen w-screen">
        <div className="border p-4 rounded-md bg-[white]">
          <div className="pb-2 border-b">
            <h2 className="font-semibold text-xl font-cubito">Sign Up</h2>
          </div>
            <div className="mt-4">
              <div className="mt-2">
                <div><label className="font-cubito" htmlFor="name">Generate your name</label></div>
                <div className="items-center flex mt-1">
                  <input disabled value={signupRequest.anonymous_name} className="w-64 rounded-md p-2 border" type="text" />
                  <div className="pl-2">
                    <button className="hover:text-[#4C73D5] text-[#668AE4]" onClick={() => generateName()} ><IoDice size={24} /></button>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div><label className="font-cubito" htmlFor="email">Email</label></div>
                <div className="mt-1"><input onChange={(e) => handleSignupRequest(e)} value={signupRequest.email} name="email" placeholder="email@example.com" className="w-64 rounded-md p-2 border" type="text" /></div>
              </div>
              <div className="mt-2">
                <div><label className="font-cubito" htmlFor="password">Password</label></div>
                <div className="mt-1"><input onChange={(e) => handleSignupRequest(e)} value={signupRequest.password} name="password" placeholder="********" className="w-64 rounded-md p-2 border" type="password" /></div>
              </div>
              <div className="mt-4">
                <div><label className="font-cubito" htmlFor="bio">Bio</label></div>
                <div className="mt-1"><input onChange={(e) => handleSignupRequest(e)} value={signupRequest.bio} name="bio" placeholder="This is me in 6 words" className="w-64 rounded-md p-2 border" type="text" /></div>
              </div>
            </div>
            <div className="pt-1">
              <h2 className="text-xs text-[red] font-cubito">{error}</h2>
            </div>
            <div className="mt-8 items-center justify-between flex">
              <div></div>
              { true ? (
                <button onClick={() => signup()} className="hover:bg-[#4C73D5] rounded-md text-[white] font-cubito bg-[#668AE4] pr-6 pl-6 p-3" >Get Started</button>
              ):(
                <button disabled className="rounded-md text-[white] font-cubito bg-[#668AE4] pr-6 pl-6 p-3" >Get Started</button>
              )}
            </div>
          </div>
      </div> 
    )
  }

  return null;

}

export default LoginScreen