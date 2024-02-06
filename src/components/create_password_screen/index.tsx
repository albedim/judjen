import { useEffect, useState } from "react"
import { BASE_URL, isLoggedIn, setCookie } from "../../utils/api"
import axios from "axios"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { IoDice } from "react-icons/io5"
import { SpinnerCircular } from "spinners-react"

const CreatePasswordScreen = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [request, setRequest] = useState({
    recovery_token: searchParams.get("token"),
    password: '',
    confirm_password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [message, setMessage] = useState("")

  const handleRequest = (e: any) => {
    const newRequest: any = { ...request }
    newRequest[e.target.name] = e.target.value
    setRequest(newRequest)
    setError("")
    setMessage("")
  }

  const create = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.post(BASE_URL + "/users/create_password", request)
    .then(res => {
      setMessage(res.data.param)
      navigate("/")
    })
    .catch(err => setError(err.response.data.error.message))
    setIsLoading(false)
  }

  return(
    <div className="items-center justify-around flex backdrop-blur-sm absolute h-screen w-screen">
      <div className="border p-4 rounded-md bg-[white]">
        <div className="pb-2 border-b">
          <h2 className="font-semibold text-xl font-cabin">Recover your password</h2>
        </div>
        <form onSubmit={(e) => create(e)} action="">
          <div className="mt-4">
            <div className="mt-2">
              <div>
                <label className="font-cabin" htmlFor="email">Your new Password</label>
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
            <div className="mt-2">
              <div>
                <label className="font-cabin" htmlFor="email">Confirm your password</label>
              </div>
              <div className="mt-1">
                <input
                  onChange={(e) => handleRequest(e)} 
                  value={request.confirm_password} 
                  name="confirm_password" 
                  placeholder="********" 
                  className="w-64 rounded-md p-2 border" 
                  type="password" 
                />
              </div>
            </div>
          </div>
          <div className="pt-1">
            <h2 className="text-xs text-[red] font-cabin">{error}</h2>
            <h2 className="text-xs text-[green] font-cabin">{message}</h2>
          </div>
          <div className="mt-8 items-center justify-between flex">
            {request.password.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$") && request.password == request.confirm_password ? (
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
                  Recover
                </button>
              )
            ):(
              <button
                disabled 
                className="rounded-md text-[white] font-cabin bg-[#668AE4] pr-6 pl-6 p-3" 
              >
                Recover
              </button>
            )}
          </div>
        </form>
      </div>
    </div> 
  )
}

export default CreatePasswordScreen