import { PiSmileySadLight } from "react-icons/pi"

const NotFound = () => {
  return(
    <div className="w-full items-center justify-around flex">
      <div>
        <div className="justify-around flex"><PiSmileySadLight color="#668AE4" size={50} /></div>
        <h2 className="mt-2 text-md font-normal font-cabin" >No results were found.</h2>
      </div>
    </div>
  )
}

export default NotFound