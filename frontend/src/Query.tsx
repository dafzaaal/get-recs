import './App.css'
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Typewriter from 'typewriter-effect'


export async function queryAPI() {
    const response = fetch('http://localhost:3000')
    const data = await response
    return data.json()
}


export default function GetData() {

    const userData = useLocation()
    let data: Object

    useEffect(() => {
       data = queryAPI()
       console.log(data)
    }, [])

    return (
        <div className="flex flex-row w-screen h-screen">
            <div id="gemini_output" className="flex h-screen w-screen text-left bg-black font-bold text-xl  p-10">
                <div>
                    <h1 className='pb-5'>Gemini Response</h1>
                    <Typewriter options={{
                        strings: "User wants to learn about: " + userData.state.data,
                        autoStart: true,
                        delay: 90
                    }} />
                    <Typewriter options={{
                        strings: "Gemini Says... \n\n" + "Fake response from gemini",
                        autoStart: true
                    }}/>
                </div>
                
            </div>
            <div id="yotube_recs" className="h-screen w-screen bg-white text-black text-left font-roboto font-bold text-2xl p-10">
                <h1 className='pb-5'>Recommendations</h1>
            </div>
        </div>
    )
}