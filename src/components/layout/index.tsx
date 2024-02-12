import React from "react"
import SideBar from "../sidebar"
import NavBar from "../navbar"

interface LayoutProps{
  children: any
  sideBarPage: "stories" | "friends" | "create" | "account" | "logout"
}

const Layout: React.FC<LayoutProps> = ( props ) => {
  return(
    <div className="h-screen w-screen flex">
      <SideBar page={props.sideBarPage}/>
      <div>
        <NavBar/>
        {props.children}
      </div>
    </div>
  )
}

export default Layout