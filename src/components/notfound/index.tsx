import React from "react"
import { PiSmileySadLight } from "react-icons/pi"

interface NotFoundProps{
  message: string
}

const NotFound: React.FC<NotFoundProps> = ( props ) => {
  return(
    <div style={{ maxWidth: 164 }} className="w-full items-center justify-around flex">
      <div>
        <div className="justify-around flex"><PiSmileySadLight color="#668AE4" size={50} /></div>
        <h2 className="text-center mt-2 text-md font-normal font-cabin" >{props.message}</h2>
      </div>
    </div>
  )
}

export default NotFound