import { FaBookBookmark } from 'react-icons/fa6'
import { MdAccountCircle, MdFavorite, MdPeopleAlt } from 'react-icons/md'
import { IoIosCreate, IoMdPerson } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { eraseCookie, getCookie, getUser, isLoggedIn } from '../../utils/api'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import LoginScreen from '../login_screen'
import './index.css'


interface SideBarProps {
  page: "stories" | "friends" | "create" | "account" | "logout"
}

const SideBar: React.FC<SideBarProps> = ( props ) => {

  const [userId, setUserId] = useState("")
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    getUserId()
    handleAuth()
  },[])

  const getUserId = () => {
    const cookie: any = getCookie("jwt-token")
    if (cookie) {
      setUserId(jwtDecode<any>(cookie).sub.user_id)
    }
  }

  const handleAuth = async () => {
    setLoggedIn(await isLoggedIn())
  }

  return (
    <div className="z-40 bg-[white] fixed h-screen wi p-4 border">
      <div className="items-center flex pt-8 pb-4 border-b">
        <div>
          <img width={42} src={require("../../images/logo.png")} alt="" />
        </div>
        <h2 className='block-none text-[#668AE4] ml-2 text-xl font-semibold font-cabin pl-2'>Jud<span className='text-[#4C73D5] font-bold'>Jen</span></h2>
      </div>
      <div className='pb-8 border-b mt-8'>
        <ul>
          <Link to={"/"}>
            <li className="cursor-pointer pb-2 align-center flex">
              {props.page == 'stories' ? (
                <div
                  className='text-[#668AE4] transition-all w-full p-2 flex bg-opacity-10 bg-[#668AE4] rounded-md'>
                  <div className='items-center justify-around flex'><FaBookBookmark size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Storie</p>
                </div>
              ):(
                <div
                  className='hover:text-[#668AE4] transition-all w-full p-2 flex 
                             hover:bg-opacity-10 hover:bg-[#668AE4] rounded-md'
                >
                  <div className='items-center justify-around flex'><FaBookBookmark size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Storie</p>
                </div>
              )}
            </li>
          </Link>
          <Link to={"/friends"}>
            <li className="cursor-pointer pb-2 align-center flex">
              {props.page == 'friends' ? (
                <div className='text-[#668AE4] transition-all w-full p-2 flex bg-opacity-10 bg-[#668AE4] rounded-md'>
                  <div className='items-center justify-around flex'><MdPeopleAlt size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Amici</p>
                </div>
              ):(
                <div className='hover:text-[#668AE4] transition-all 
                                w-full p-2 flex hover:bg-opacity-10 hover:bg-[#668AE4] rounded-md'
                >
                  <div className='items-center justify-around flex'><MdPeopleAlt size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Amici</p>
                </div>
              )}
            </li>
          </Link>
          <Link to={"/create"}>
            <li className="cursor-pointer pb-1 align-center flex">
              {props.page == 'create' ? (
                <div className='text-[#668AE4] transition-all w-full p-2 flex 
                                bg-opacity-10 bg-[#668AE4] rounded-md'
                >
                  <div className='items-center justify-around flex'><IoIosCreate size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Crea una storia</p>
                </div>
              ):(
                <div className='hover:text-[#668AE4] transition-all w-full 
                                p-2 flex hover:bg-opacity-10 hover:bg-[#668AE4] rounded-md'
                >
                  <div className='items-center justify-around flex'><IoIosCreate size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Crea una storia</p>
                </div>
              )}
            </li>
          </Link>
        </ul>
      </div>
      <div style={{ display: loggedIn ? 'block' : 'none' }} className='mt-4'>
        <ul>
          <Link to={"/user/" + userId}>
            <li className="cursor-pointer pb-2 align-center flex">
              {props.page == 'account' ? (
                <div className='text-[#668AE4] transition-all 
                                w-full p-2 flex bg-opacity-10 bg-[#668AE4] rounded-md'
                >
                  <div className='items-center justify-around flex'><IoMdPerson size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Profilo</p>
                </div>
              ):(
                <div className='hover:text-[#668AE4] transition-all w-full p-2 
                                flex hover:bg-opacity-10 hover:bg-[#668AE4] rounded-md'
                >
                  <div className='items-center justify-around flex'><IoMdPerson size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Profilo</p>
                </div>
              )}
            </li>
          </Link>
          <li 
            onClick={() => { 
              eraseCookie("jwt-token"); 
              navigate("/"); 
              navigate(0) 
            }} 
            className="cursor-pointer pb-2 align-center flex"
          >
            <div className='hover:text-[white] transition-all w-full p-2 flex hover:bg-[#D33939] rounded-md'>
              <div className='items-center justify-around flex'><IoLogOut size={14} /></div>
              <p className='block-none font-cabin pl-2' >Esci</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar