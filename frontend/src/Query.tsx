import './App.css'
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Typewriter from 'typewriter-effect'
import { useNavigate } from 'react-router-dom'




export default function GetData() {

    const userData = useLocation();
    const [data, setData] = useState<any | null>(null);
    const boundaries = ". Keep the answer short and to the point"
    const navigator = useNavigate()

     async function queryAPI() {
        const response = await fetch('http://localhost:3000', {
            method: 'POST',
            body: JSON.stringify({
                user_prompt: userData.state.data + boundaries
            })
        });
        const data = await response.text()
        if (userData.state.data == "") {
            setData("Seems you forgot to ask a question, don't worry, hit the back button and try again...")
        }
        else if (data.includes("Error")) {
            setData("Uh oh, seems like we're experiencing some issues contacting Gemini, try again later.")
        }
        else {
            setData(data)
        }
        
    }

    useEffect(() => {
        if(userData.state.data != "") {
            queryAPI()
        }
    }, [])



    return (
        <div className="flex flex-row w-screen h-screen">
            <div id="gemini_output" className="flex h-screen w-screen text-left bg-black font-bold text-xl p-10">
                <div className='w-1/1'>
                    <h1 className='pb-5'>Gemini Says...</h1>
                    <div id='ai-response' className='bg-white text-black h-1/2 p-7 rounded-lg font-medium font-consolas text-lg'>
                        {data ? (
                            <Typewriter options={{
                                strings: data,
                                autoStart: true,
                                delay: 90
                            }} />
                        ) : (
                            <Typewriter options={{
                                strings: "Can't really ask Gemini a question if you never left one to begin with, lets go back and try again...",
                                autoStart: true,
                                delay: 90
                            }} />
                        )
                            
                        }       
                    </div>
                    <button className='text-black border-2 border-black bg-white hover:text-white hover:bg-black hover:border-white hover:border pt-2 pb-2 pl-7 pr-7 font-consolas font-light mt-5 rounded-md' onClick={() => {navigator('/')}}>Back</button>

                </div>
                
            </div>
            <div id="yotube_recs" className="h-screen w-screen bg-white text-black text-left font-roboto font-bold text-2xl p-10">
                <h1>Recommendations</h1>
            </div>
        </div>
    )
}