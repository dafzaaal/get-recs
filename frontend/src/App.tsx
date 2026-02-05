import './App.css'
import { motion } from "framer-motion"
import DotGrid from './DotGrid'
import SplitText from './SplitText'
import { useState } from 'react'




export default function App() {

  const [query, setQuery] = useState('')

  function handleInputStateChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      setQuery(event.target.value)
      console.log(query)
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
            <p className='text-black w-2/3 text-center text-xl font-roboto'>
              Welcome to <b>Get Recs!</b> This is a dummy application leveraging the YouTube API and Gemini to take a user 
              prompt and generate an AI response as well as reccommend a couple videos regarding the topic for the user.
              The goal of this applicatin is to help me understand hosting a web-application on an nginx server as
              well as learn the basics of integrating regular Playwright test cases into a GitHub Actions CI/CD pipeline.
            </p>
            <label className='text-black font-roboto mt-10 mb-10 font-medium text-lg'>Enter something neat you'd like to learn more about below!</label>
            <textarea placeholder=' Type away...' className='text-white bg-black rounded-lg w-2/3 h-1/3' onChange={handleInputStateChange}></textarea>
            <motion.button 
              className='shadow-2xl mt-5 bg-amber-100'
              initial={false}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.35 }}
            
            >
              Start learning...</motion.button>
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