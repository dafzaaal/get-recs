import { useState } from "react"
import { useLocation } from "react-router-dom"


export default function GetData() {

    const [ apiData, setAPIData ] = useState('')
    const userData = useLocation()

    async function queryAPI() {
        const response = fetch('http://localhost:3000')
        const data = await response
        setAPIData(await data.json())
    }


    return (
        <div>
            {userData.state.data}
        </div>
    )
}