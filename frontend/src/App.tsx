import './App.css'
import { easeInOut, motion, reverseEasing } from "framer-motion"

type WavyTextProps = {
  char: string
  index: number
}

type CreateWavyTextProps = {
  word: string
}

function WavyText(props: WavyTextProps) {
  return (
    <motion.span
      initial={{ y: -25 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, ease: easeInOut, repeatType: "reverse", delay: props.index * 0.2 }}
    >
      {props.char}
    </motion.span>
  )
}



function CreateWavyText(props: CreateWavyTextProps) {
  const text: string = props.word
  return text.split('').map((char, index) => (
    <WavyText key={index} char={char} index={index}/>
  ));
}

export default function App() {
  return (
    <motion.div>
        <CreateWavyText word='Welcome'/>
        <div>
          Welcome to <b>Get Recs!</b>!, this is a simple application leveraging the Gemini and YouTube API to
          provide some insight on some topics of interest as well as some YouTube video reccommendations. 
        </div>
        <input placeholder='Enter a topic of interest...' className=' border-white rounded-lg bg-white text-black w-2xl p-3 m-10'></input>
    </motion.div>
  )
}