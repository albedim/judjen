import { useEffect, useState } from "react"
import { BASE_URL, isLoggedIn, setCookie } from "../../utils/api"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { IoDice } from "react-icons/io5"
import { SpinnerCircular } from "spinners-react"


const LimitScreen = () => {

  const navigate = useNavigate()

  return(
    <div className="z-50 items-center justify-around flex backdrop-blur-sm fixed top-0 h-screen w-screen">
      <div style={{ maxWidth: 314 }} className="border p-4 rounded-md bg-[white]">
        <div className="pb-2 border-b">
          <h2 className="font-semibold text-xl font-cabin">Ops! Limite raggiunto</h2>
        </div>
        <div className="mt-2">
          <p>Siamo contenti ti stia piacendo leggere tutte queste storie ma purtroppo hai raggiunto il tuo limite giornaliero</p>
        </div>
        <div className="mb-4 mt-6 flex justify-around">
          <div>
            <div className="flex justify-around">
              <div>
                <p className="text-xs font-cabin">+10 storie ora</p>
                <button
                  className="mt-1 rounded-md text-[white] font-cabin bg-[#668AE4] pr-6 pl-6 p-3"
                    onClick={() => navigate("/create")}
                  >
                    Crea una storia
                </button>
              </div>
            </div>
            <div className="items-center mt-3 mb-3 gap-4 flex">
              <div className="rounded-md w-14 h-1 bg-[#e4e4e4]"></div>
              <p className="font-semibold font-cabin text-[#e4e4e4]">or</p>
              <div className="rounded-md w-14 h-1 bg-[#e4e4e4]"></div>
            </div>
            <div className="flex justify-around">
              <p 
                className="font-semibold font-cabin text-[#668AE4]" >
                  Torna domani
              </p>
            </div>
          </div>
        </div>   
      </div>
    </div> 
  )
}

export default LimitScreen