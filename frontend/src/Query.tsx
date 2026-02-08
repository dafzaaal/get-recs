import './App.css'
import { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Typewriter from 'typewriter-effect'





export default function GetData() {

    const userData = useLocation();
    const [data, setData] = useState(null);

     async function queryAPI() {
        const response = await fetch('http://localhost:3000')
        const jsonData = await response.json()
        console.log(jsonData)
        setData(jsonData)
    }

    useEffect(() => {
        queryAPI()
    }, [])

    return (
        <div className="flex flex-row w-screen h-screen">
            <div id="gemini_output" className="flex h-screen w-screen text-left bg-black font-bold text-xl p-10">
                <div>
                    <h1 className='pb-5'>Gemini Says...</h1>
                    {userData.state.data}
                    {data && (
                        <Typewriter options={{
                            strings: data,
                            autoStart: true,
                            delay: 90
                        }} />
                    )};
                </div>
                
            </div>
            <div id="yotube_recs" className="h-screen w-screen bg-white text-black text-left font-roboto font-bold text-2xl p-10">
                <h1>Recommendations</h1>
            </div>
        </div>
    )
}