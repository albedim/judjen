import axios from "axios"
import Avatar from "boring-avatars"
import { useEffect, useState } from "react"
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io"
import { MdCancel } from "react-icons/md"
import { Link } from "react-router-dom"
import { BASE_URL, getCookie } from "../../utils/api"
import { Topic } from "../../typos/interfaces"
import { SpinnerCircular } from "spinners-react"

const Create = () => {

  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([])
  const [availableTopics, setAvailableTopics] = useState<Topic[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [story, setStory] = useState({
    title: '',
    content: ''
  })
  const [isLoading, setIsLoading] = useState(false)
 
  const addTopic = (topicId: string) => {
    if (topicId == "null") {
      return;
    }
    if (selectedTopics.length == 3) {
      return;
    }
    const castedTopic: Topic = availableTopics.filter((e) => e.tag_id.toString() == topicId)[0]
    console.log(castedTopic)
    const newSelectedTopics = selectedTopics;
    newSelectedTopics.push(castedTopic);
    const newTopics = topics.filter(e => e.tag_id != castedTopic.tag_id);
    setSelectedTopics(newSelectedTopics)
    setTopics(newTopics)
  }

  const removeTopic = (topicId: string) => {
    const castedTopic: Topic = availableTopics.filter((e) => e.tag_id.toString() == topicId)[0]
    console.log(selectedTopics)
    const newSelectedTopics = selectedTopics.filter(e => e.tag_id != castedTopic.tag_id)
    const newTopics = topics;
    newTopics.push(castedTopic)
    setSelectedTopics(newSelectedTopics)
    setTopics(newTopics)
  }

  const getTopics = async () => {
    await axios.get(BASE_URL + "/tags")
    .then(res => {
      setTopics(res.data.param)
      setAvailableTopics(res.data.param)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getTopics()
  },[])

  const handleStory = (e: any) => {
    const newStory: any = { ...story }
    newStory[e.target.name] = e.target.value
    setStory(newStory)
  }

  const createStory = async () => {
    setIsLoading(true)
    await axios.post(BASE_URL + "/stories/", { ...story, topics: selectedTopics }, { headers: { Authorization: 'Bearer ' + getCookie("jwt-token") } })
    .then(res => console.log())
    .catch(err => console.log(err))
    setIsLoading(false)
  }


  return (
    <div className="p-8">
      <div className="pb-4">
        <h1 className="text-xl font-semibold font-cubito" >Create</h1>
      </div>
      <div>
        <div className="mt-2">
          <div><label className="font-cubito" htmlFor="title">Title</label></div>
          <div className="mt-1"><input onChange={(e) => handleStory(e)} name="title" value={story.title} placeholder="Add friend..." className="w-64 rounded-md p-2 border" type="text" /></div>
        </div>
        <div className="mt-2">
          <div><label className="font-cubito" htmlFor="content">Content</label></div>
          <div className="mt-1"><textarea onChange={(e) => handleStory(e)} name="content" value={story.content} placeholder="Add friend..." className="w-64 h-44 rounded-md p-2 border" /></div>
        </div>
        <div className="mt-2 flex">
          {selectedTopics.map((topic => (
            <div className="p-1">
              <div className="items-center flex text-sm font-cubito text-[white] pr-2 p-1 pl-2 rounded-md bg-[#668AE4]">
                <p>{topic.name}</p>
                <MdCancel onClick={(e) => removeTopic(topic.tag_id.toString())} className="cursor-pointer ml-2"/>
              </div>
            </div>
          )))}
        </div>
        <div className="mt-2">
          <div><label className="font-cubito" htmlFor="topics">Topics</label></div>
          <div className="mt-1">
            <select onChange={(e) => addTopic(e.target.value)} className="w-64 bg-[white] rounded-md p-2 border" >
              <option value={"null"}></option>
              {topics.map(topic => (
                <option value={topic.tag_id}>{topic.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-8">
          { selectedTopics.length > 0 && story.title != "" && story.content != "" ? (
              isLoading ? (
                <button disabled className="rounded-md text-[white] font-cubito bg-[#668AE4] pr-6 pl-6 p-3" >
                  <SpinnerCircular
                    color="white"
                    speed={254}
                    size={24}
                    thickness={184}
                    secondaryColor="transparent"
                  />
                </button>
              ):(
                <button onClick={() => createStory()} className="hover:bg-[#4C73D5] rounded-md text-[white] font-cubito bg-[#668AE4] pr-6 pl-6 p-3" >Create</button>
              )
            ):(
            <button disabled className="rounded-md text-[white] font-cubito bg-[#668AE4] pr-6 pl-6 p-3" >Create</button>
          )}
        </div>
      </div>
    </div>
  )
}
  
export default Create