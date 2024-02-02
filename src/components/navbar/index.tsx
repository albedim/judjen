import { FaBookBookmark } from 'react-icons/fa6'
import { MdAccountCircle, MdFavorite, MdPeopleAlt } from 'react-icons/md'
import { IoIosCreate, IoMdPerson } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { Link } from 'react-router-dom'

interface NavBarProps {
  page: "stories" | "friends" | "create" | "account" | "logout"
}

const NavBar: React.FC<NavBarProps> = ( props ) => {
  return (
    <div className="h-screen w-64 p-4 border">
        <div className="pt-8 pb-8 border-b">
          logo
        </div>
        <div className='pb-8 border-b mt-8'>
          <ul>
            <Link to={"/"}>
              <li className="cursor-pointer pb-2 align-center flex">
                {props.page == 'stories' ? (
                  <div
                    className='text-[#668AE4] transition-all w-full p-2 flex bg-opacity-10 bg-[#668AE4] rounded-md'>
                    <div className='items-center justify-around flex'><FaBookBookmark size={14} /></div>
                    <p className='font-cabin pl-2' >Stories</p>
                  </div>
                ):(
                  <div
                    className='hover:text-[#668AE4] transition-all w-full p-2 flex hover:bg-opacity-10 hover:bg-[#668AE4] rounded-md'>
                    <div className='items-center justify-around flex'><FaBookBookmark size={14} /></div>
                    <p className='font-cabin pl-2' >Stories</p>
                  </div>
                )}
              </li>
            </Link>
            <Link to={"/friends"}>
              <li className="cursor-pointer pb-2 align-center flex">
                {props.page == 'friends' ? (
                  <div className='text-[#668AE4] transition-all w-full p-2 flex bg-opacity-10 bg-[#668AE4] rounded-md'>
                    <div className='items-center justify-around flex'><MdPeopleAlt size={14} /></div>
                    <p className='font-cabin pl-2' >Friends</p>
                  </div>
                ):(
                  <div className='hover:text-[#668AE4] transition-all w-full p-2 flex hover:bg-opacity-10 hover:bg-[#668AE4] rounded-md'>
                    <div className='items-center justify-around flex'><MdPeopleAlt size={14} /></div>
                    <p className='font-cabin pl-2' >Friends</p>
                  </div>
                )}
              </li>
            </Link>
            <Link to={"/create"}>
              <li className="cursor-pointer pb-1 align-center flex">
                {props.page == 'create' ? (
                  <div className='text-[#668AE4] transition-all w-full p-2 flex bg-opacity-10 bg-[#668AE4] rounded-md'>
                    <div className='items-center justify-around flex'><IoIosCreate size={14} /></div>
                    <p className='font-cabin pl-2' >Create Story</p>
                  </div>
                ):(
                  <div className='hover:text-[#668AE4] transition-all w-full p-2 flex hover:bg-opacity-10 hover:bg-[#668AE4] rounded-md'>
                    <div className='items-center justify-around flex'><IoIosCreate size={14} /></div>
                    <p className='font-cabin pl-2' >Create Story</p>
                  </div>
                )}
              </li>
            </Link>
          </ul>
        </div>
        <div className='mt-4'>
          <ul>
            <Link to={"/account"}>
              <li className="cursor-pointer pb-2 align-center flex">
                {props.page == 'account' ? (
                  <div className='text-[#668AE4] transition-all w-full p-2 flex bg-opacity-10 bg-[#668AE4] rounded-md'>
                    <div className='items-center justify-around flex'><IoMdPerson size={14} /></div>
                    <p className='font-cabin pl-2' >Account</p>
                  </div>
                ):(
                  <div className='hover:text-[#668AE4] transition-all w-full p-2 flex hover:bg-opacity-10 hover:bg-[#668AE4] rounded-md'>
                    <div className='items-center justify-around flex'><IoMdPerson size={14} /></div>
                    <p className='font-cabin pl-2' >Account</p>
                  </div>
                )}
              </li>
            </Link>
            <li className="cursor-pointer pb-2 align-center flex">
              <div className='hover:text-[white] transition-all w-full p-2 flex hover:bg-[#D33939] rounded-md'>
                <div className='items-center justify-around flex'><IoLogOut size={14} /></div>
                <p className='font-cabin pl-2' >Log Out</p>
              </div>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default NavBar