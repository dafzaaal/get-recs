import './App.css'
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Typewriter from 'typewriter-effect'
import { useNavigate } from 'react-router-dom'
import VideoComponent from './Video'

export default function GetData() {

    const userData = useLocation();
    const [data, setData] = useState<any | null>(null);
    const [videoData, setVideoData] = useState<any | null>(null);
    const boundaries: string = ". Keep the answer short and to the point"
    const navigator = useNavigate()
    const errorMessage: string = "Uh oh, seems you forgot to ask a question, that's fine, let's go back and try again..."
   
    function TypeWriter(message: string) {
        return (
            <Typewriter options={{
                strings: message,
                autoStart: true,
                delay: 90
            }} /> 
        )
    }

    function createVideoComponents(recs: any) {
        const videosComponents = [];
        const videoURL: string = "https://www.youtube.com/watch?v="
        for(let i = 0; i < 3; i++) {
            let currRec = recs[i];
            videosComponents.push(
                <VideoComponent key={i} rec={currRec} videoURL={videoURL}/>
            )
        }
        return videosComponents;
    }


    async function queryAPI() {
    const response = await fetch('http://localhost:3000/gemini', {
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
        const videoAPIData = await response.json();
        const components = createVideoComponents(videoAPIData);
        setVideoData(components);
    }

    useEffect(() => {
        if(userData.state.data != "") {
            queryAPI();
            queryYouTube();
        }
    }, []);


    return (
        <div className="flex flex-row w-screen h-screen">
            <div id="gemini_output" className="flex h-screen w-screen text-left bg-black font-bold text-xl p-10">
                <div className='w-1/1'>
                    <h1 className='pb-5'>Gemini Says...</h1>
                    <div id='ai-response' className='bg-white text-black h-1/2 p-7 rounded-lg font-medium font-consolas text-lg overflow-y-auto'>
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
                        {videoData}
                    </div>
                </div>
            </div>
        </div>
    )
}