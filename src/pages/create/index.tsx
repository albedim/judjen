import axios from "axios"
import '../index.css'
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
    <div className="mt-16 mlpage p-8">
      <div className="pb-4">
        <h1 className="text-xl font-semibold font-cabin" >Crea una storia</h1>
      </div>
      <div>
        <div className="mt-2">
          <div><label className="font-cabin" htmlFor="title">Titolo</label></div>
          <div className="mt-1"><input onChange={(e) => handleStory(e)} name="title" value={story.title} placeholder="Questa è la mia prima storia..." className="w-64 rounded-md p-2 border" type="text" /></div>
        </div>
        <div className="mt-2">
          <div><label className="font-cabin" htmlFor="content">Contenuto</label></div>
          <div className="mt-1"><textarea onChange={(e) => handleStory(e)} name="content" value={story.content} placeholder="Ogni giorno amo sempre di più leggere storie cringe" className="w-64 h-44 rounded-md p-2 border" /></div>
          <div className="justify-between items-center flex">
            <div></div>
            <p className="font-cabin mt-1 text-sm">{
              story.content.length > 1500 ? (
                <span className="text-[red]">{story.content.length}</span>
              ):(
                <span>{story.content.length}</span>
              )}/1500
            </p>
          </div>
        </div>
        <div className="mt-2 flex">
          {selectedTopics.map((topic => (
            <div className="p-1">
              <div className="items-center flex text-sm font-cabin text-[white] pr-2 p-1 pl-2 rounded-md bg-[#668AE4]">
                <p>{topic.name}</p>
                <MdCancel onClick={(e) => removeTopic(topic.tag_id.toString())} className="cursor-pointer ml-2"/>
              </div>
            </div>
          )))}
        </div>
        <div className="mt-2">
          <div><label className="font-cabin" htmlFor="topics">Tipo</label></div>
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
          { selectedTopics.length > 0 && story.title != "" && story.content.length > 0 && story.content.length < 1500 ? (
              isLoading ? (
                <button disabled className="rounded-md text-[white] font-cabin bg-[#668AE4] pr-6 pl-6 p-3" >
                  <SpinnerCircular
                    color="white"
                    speed={254}
                    size={24}
                    thickness={184}
                    secondaryColor="transparent"
                  />
                </button>
              ):(
                <button onClick={() => createStory()} className="hover:bg-[#4C73D5] rounded-md text-[white] font-cabin bg-[#668AE4] pr-6 pl-6 p-3" >Crea</button>
              )
            ):(
            <button disabled className="rounded-md text-[white] font-cabin bg-[#668AE4] pr-6 pl-6 p-3" >Crea</button>
          )}
        </div>
      </div>
    </div>
  )
}
  
export default Create