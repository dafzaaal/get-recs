import './App.css'
import GetData from './Query'
import { motion } from "framer-motion"
import DotGrid from './DotGrid'
import SplitText from './SplitText'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'





export function Landing() {

    const [ query, setQuery ] = useState('')

    const navigate = useNavigate()

  function handleInputStateChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      setQuery(event.target.value)
      console.log(query)
  }

  const handleButtonClick = () => {
    navigate('/learning', {state: {data: query}})
  }


  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <motion.div className='flex w-screen h-screen'>
      <div id='text-area' className='w-screen flex flex-col justify-center items-center'>
         <SplitText
            text="Welcome!"
            className="text-8xl font-roboto font-extrabold text-center mb-5 text-black"
            delay={50}
            duration={3}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
            <p id='app-explanation' className='text-black w-2/3 text-center text-xl font-consolas'>
              Welcome to <b>Get Recs!</b> This is a dummy application leveraging the YouTube API and Gemini to take a user 
              prompt and generate an AI response as well as reccommend a couple videos regarding the topic for the user.
              The goal of this application is to help me understand hosting a web-application on an nginx server as
              well as learn the basics of integrating regular Playwright test cases into a GitHub Actions CI/CD pipeline.
            </p>
            <label className='text-black font-consolas mt-10 mb-10 font-medium text-lg'>Enter something neat you'd like to learn more about below!</label>
            <textarea placeholder=' Type away...' className='text-white bg-black rounded-lg w-2/3 h-1/3 p-3' onChange={handleInputStateChange}></textarea>
            <button
              className='text-white border-2 border-black bg-black hover:text-black hover:bg-white hover:cursor-pointer pt-3 pb-3 pl-7 pr-7 font-consolas font-light mt-5 rounded-md '
              onClick={handleButtonClick}
            >
              Start learning...</button>
      </div>
      <div id='img-area' className='w-full h-screen'>
       <DotGrid
          dotSize={13}
          gap={15}
          baseColor="#FFFFFF"
          activeColor="#00000"
          proximity={120}
          shockRadius={250}
          shockStrength={10}
          resistance={750}
          returnDuration={1}
       />
      </div>
    </motion.div>
  )
}




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/learning' element={<GetData/>}/>
      </Routes>
    </BrowserRouter>
  )

}