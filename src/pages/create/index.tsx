import Avatar from "boring-avatars"
import { useState } from "react"
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io"
import { MdCancel } from "react-icons/md"
import { Link } from "react-router-dom"

const Create = () => {

  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [topics, setTopics] = useState<string[]>(["aa", "bb", "cc"])
 
  const addTopic = (topic: string) => {
    if (topic == "") {
      return;
    }
    const newSelectedTopics = selectedTopics;
    newSelectedTopics.push(topic);
    const newTopics = topics.filter(e => e != topic);
    setSelectedTopics(newSelectedTopics)
    setTopics(newTopics)
  }

  const removeTopic = (topic: string) => {
    const newSelectedTopics = selectedTopics.filter(e => e != topic);;
    const newTopics = topics;
    newTopics.push(topic)
    setSelectedTopics(newSelectedTopics)
    setTopics(newTopics)
  }

  return (
    <div className="p-8">
      <div className="pb-4">
        <h1 className="text-xl font-semibold font-cubito" >Create</h1>
      </div>
      <div>
        <div className="mt-2">
          <div><label className="font-cubito" htmlFor="title">Title</label></div>
          <div className="mt-1"><input placeholder="Add friend..." className="w-64 rounded-md p-2 border" type="text" /></div>
        </div>
        <div className="mt-2">
          <div><label className="font-cubito" htmlFor="content">Content</label></div>
          <div className="mt-1"><textarea placeholder="Add friend..." className="w-64 h-44 rounded-md p-2 border" /></div>
        </div>
        <div className="mt-2 flex">
          {selectedTopics.map((topic => (
            <div className="p-1">
              <div className="items-center flex text-sm font-cubito text-[white] pr-2 p-1 pl-2 rounded-md bg-[#668AE4]">
                <p>{topic}</p>
                <MdCancel onClick={(e) => removeTopic(topic)} className="cursor-pointer ml-2"/>
              </div>
            </div>
          )))}
        </div>
        <div className="mt-2">
          <div><label className="font-cubito" htmlFor="topics">Topics</label></div>
          <div className="mt-1">
            <select onChange={(e) => addTopic(e.target.value)} className="w-64 bg-[white] rounded-md p-2 border" >
              <option value=""></option>
              {topics.map(topic => (
                <option value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-8">
          <button className="hover:bg-[#4C73D5] rounded-md text-[white] font-cubito bg-[#668AE4] pr-6 pl-6 p-3" >Create</button>
        </div>
      </div>
    </div>
  )
}
  
export default Create