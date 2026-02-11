import './App.css'
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Typewriter from 'typewriter-effect'
import { useNavigate } from 'react-router-dom'

export default function GetData() {

    const userData = useLocation();
    const [data, setData] = useState<any | null>(null);
    const [recs, setRecs] = useState<any | null>(null);
    const boundaries: string = ". Keep the answer short and to the point"
    const navigator = useNavigate()
    const errorMessage: string = "Uh oh, seems you forgot to ask a question, that's fine, let's go back and try again..."
    const videoURL: string = "https://www.youtube.com/watch?v="


    function TypeWriter(message: string) {
        return (
            <Typewriter options={{
                strings: message,
                autoStart: true,
                delay: 90
            }} /> 
        )
    }

    function generateVideo() {
        let videos = [];
        for(let i = 0; i < 3; i++) {
            let currRec = recs[i];
            videos.push(
                <div className='border-2 border-black'>
                    <img src={currRec["thumbnail"]}></img>
                    <div>
                        <a href={videoURL + currRec["videoId"]} target='_blank'>
                            {currRec["title"]}
                        </a>
                        {currRec["desc"]}
                        {currRec["channelName"]}
                    </div>
                </div>
            )
        }
        return videos
    }


    async function queryAPI() {
    const response = await fetch('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify({
            user_prompt: userData.state.data + boundaries
        })
    });
    const data = await response.text()
    if (data.includes("Error")) {
        setData("Uh oh, seems like we're experiencing some issues contacting Gemini, try again later.")
    }
    else {
        setData(data)
    }
}   


    async function queryYouTube() {
        console.log("About to reach out to the YouTube API...");
        const response = await fetch('http://localhost:3000/youtube', {
            method: 'POST',
            body: JSON.stringify({
                search: userData.state.data
            })
        });
        const videoData = await response.text();
        setRecs(videoData);
        console.log(videoData);
    }

    useEffect(() => {
        if(userData.state.data != "") {
            // queryAPI()
            queryYouTube()
        }
    }, [])


    return (
        <div className="flex flex-row w-screen h-screen">
            <div id="gemini_output" className="flex h-screen w-screen text-left bg-black font-bold text-xl p-10">
                <div className='w-1/1'>
                    <h1 className='pb-5'>Gemini Says...</h1>
                    <div id='ai-response' className='bg-white text-black h-1/2 p-7 rounded-lg font-medium font-consolas text-lg'>
                        {data &&
                            TypeWriter(data)
                        }
                        {!data &&
                            TypeWriter(errorMessage)
                        }
                            
                    </div>
                    <button className='text-black border-2 border-black bg-white hover:text-white hover:bg-black hover:cursor-pointer hover:border-white hover:border pt-2 pb-2 pl-7 pr-7 font-consolas font-light mt-5 rounded-md' onClick={() => {navigator('/')}}>Back</button>

                </div>
                
            </div>
            <div id="yotube_recs" className="h-screen w-screen bg-white text-black text-left font-roboto font-bold text-2xl p-10">
                <h1>Recommendations</h1>
                <div id='video-containers' className='mt-5'>
                    <div className='w-[92%]'>
                        <div className='flex flex-row border rounded-md border-black p-3 font-consolas font-medium text-lg hover:shadow-2xl'>
                            <img src='https://i.ytimg.com/vi/joVwwQlu134/mqdefault.jpg' className='w-[250px] h-[160px]'></img>
                            <div className='ml-5'>
                                <a href='https://youtube.com' target='_blank' className='hover:cursor-pointer'>
                                    How AI is taking over everywhere?
                                </a>
                                <p className='font-light mt-2'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.
                                </p>
                                <p className='font-bold mt-2'>
                                    Channel Name
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}