import Avatar from "boring-avatars"
import { FaBookmark, FaRetweet } from "react-icons/fa6"

const HomePage = () => {
  return (
    <div className="p-8">
      <div>
        <h1 className="text-xl font-semibold font-cubito" >Stories</h1>
      </div>
      <div className="pl-0 p-4">
        <div style={{ maxWidth: 450 }} className="p-4 rounded-md border">
          <h1 className="text-xl font-cubito">Title of this story</h1>
          <div className="mt-1 items-center flex">
            <div>
              <Avatar
                size={14}
                name="Maria Mitchell"
                variant="beam"
                colors={["#668AE4", "#4e6dba", "#3a57a1", "#526db3", "#6583cf"]}
              />
            </div>
            <div className="pl-2"><p className="text-[gray] hover:underline font-cubito">User #4545</p></div>
          </div>
          <div className="mt-4">
            <p>fdhdf hfd hdf hdf hfd df hdfdfhfdhdfh fd hfd h fd h fdh fd h df h fdh fd hdf hdhfdh dfhdf hdf h dfh fdhdf</p>
          </div>
          <div className="mt-6 gap-14 flex">
            <div className="transition-all hover:opacity-60 text-[gray] cursor-pointer items-center flex">
              <div><FaRetweet size={18} /></div>
              <p className="pl-2 font-semibold ">2</p>
            </div>
            <div className="transition-all hover:opacity-60 text-[#668AE4] cursor-pointer items-center flex">
              <div><FaBookmark size={16} /></div>
              <p className="pl-2 font-semibold ">4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage