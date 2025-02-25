import { useEffect, useState } from "react"
import { Loader } from "lucide-react"
import { generateContent } from "./components/Model"

function App() {
  // const [response, setResponse] = useState<Puter>()
  const [response, setResponse] = useState<string>('')
  const [emotion, setEmotion] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [verse, setVerse] = useState<string>('')
  const [soera, setSoera] = useState<string>('')
  const [extraInfo, setExtraInfo] = useState<string>('')

  const [sunnahLoading, setSunnahLoading] = useState<boolean>(false)
  const [sunnah, setSunnah] = useState<string>('')

  // const initialzed = useRef(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };


  const getSurah = async () => {
    setLoading(true)
      let enPrompt = ""

      switch (emotion) {
        case 'Happy':
          enPrompt = `Give me an uncommon ayah that reflects the feeling of happiness, joy, and contentment. It should be a verse that encourages feelings of positivity and well-being. The return should look like this example: ""And do not lose hope in the mercy of Allah." / (Surah Az-Zumar, 39:53) / "very short reflection"`;
          break;
        case 'Thankful':
          enPrompt = `Give me an uncommon ayah that reflects the feeling of thankfulness and gratitude. It should be a verse that encourages expressing gratitude towards Allah and recognizing His blessings. The return should look like this example: ""And do not lose hope in the mercy of Allah." / (Surah Az-Zumar, 39:53) / "very short reflection"`;
          break;
        case 'Anxious':
          enPrompt = `Give me an uncommon ayah that reflects the feeling of anxiety and the need for trust in Allah's plan. It should be a verse that encourages finding peace and contentment in faith. The return should look like this example: ""And do not lose hope in the mercy of Allah." / (Surah Az-Zumar, 39:53) / "very short reflection"`;
          break;
        case 'Sad':
          enPrompt = `Give me an uncommon ayah that reflects the feeling of sadness and the need for hope and comfort. It should be a verse that encourages patience and reliance on Allah. The return should look like this example: ""And do not lose hope in the mercy of Allah." / (Surah Az-Zumar, 39:53) / "very short reflection"`;
          break;
        case 'Lonely':
          enPrompt = `Give me an uncommon ayah that reflects the feeling of loneliness and the need for companionship with Allah. It should be a verse that encourages seeking solace in Allah’s presence and His mercy. The return should look like this example: ""And do not lose hope in the mercy of Allah." / (Surah Az-Zumar, 39:53) / "very short reflection"`;
          break;
        case 'Angry':
          enPrompt = `Give me an uncommon ayah that reflects the feeling of anger and the need for patience and calm. It should be a verse that encourages controlling anger and seeking peace. The return should look like this example: ""And do not lose hope in the mercy of Allah." / (Surah Az-Zumar, 39:53) / "very short reflection"`;
          break;
        default:
          enPrompt = `Give me an uncommon ayah that fits the emotion of ${emotion}. The return should look like this example: ""And do not lose hope in the mercy of Allah." / (Surah Az-Zumar, 39:53) / "very short reflection"`;
      }

      const reply:string = await generateContent(enPrompt);
      
      const surah = reply.split(" / ")
      setVerse(surah[0])
      setSoera(surah[1])
      setExtraInfo(surah[2])

      setResponse(reply);
      setLoading(false)
    
    setLoading(false)
    setEmotion("")
  };

  const onLoadText = () => {
    return <div>
      <h1 className="text-4xl font-bold mb-2">Hi Fatma,</h1>
      <p className="text-xl font-medium">Start by selecting how you feel today.</p>
    </div>
  }

  const handleEmotion = (emotion: string) => {
    setEmotion(emotion)
    scrollToTop()
  }

  useEffect(() => {
    if (emotion.trim() !== '') {
      getSurah()
    }
  }, [emotion])

  /*Translation */
  // const googleTranslateElementInit = () => {
  //   new (window as any).google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false
  //     },
  //     "google_translate_element"
  //   );
  // };
  const handleSunnah = async () => {
    setSunnahLoading(true)
    const genSunnah = await generateContent('Give me a sunnah for today') 
    setSunnah(genSunnah)
    setSunnahLoading(false)
  }

  return (
    <div className="flex w-full h-full justify-center items-center flex-col p-10">

      <div id="container" className="flex flex-col justify-center w-[70%] max-lg:w-full">

        <div className="flex max-lg:flex-col gap-10">
          {/* <div id="google_translate_element"></div> */}
          <div id="verse" className="flex flex-col gap-10 justify-center items-center w-[65%] max-lg:w-full min-h-[500px] p-5 bg-[var(--frame-color)] rounded-xl">
            {
              loading ?
                <div className="flex flex-col gap-2 justify-center items-center text-center">
                  <Loader size={50} className="animate-spin" />
                  <p className="text-lg text-center font-bold">Feeling {emotion}...</p>
                </div>
                :
                response == '' ? onLoadText() : (
                  <div className="flex flex-col gap-2 justify-center items-center text-center">
                    <h1 className="text-xl font-bold">{soera}</h1>
                    <p className="text-xl font-medium text-center">{verse}</p>
                    <p id="extraInfo" className="text-lg font-semibold text-center opacity-40">{extraInfo}</p>
                  </div>
                )

            }
            <img src="./src/assets/fatmaPraying.png" alt="" />
          </div>

          <div id="hi" className="max-lg:hidden w-[35%] max-lg:w-full min-h-[500px] p-5 bg-[var(--frame-color)] rounded-xl">

            <div className="flex flex-col flex-wrap">
              <h1 className="text-4xl font-bold mb-2">Hi you,</h1>
              <p className="text-xl font-medium">life is full of ups and downs and sometimes we just need a guiding light to help us through.</p>
              <br />
              <p className="text-xl font-medium">Whether you're feeling joyful, anxious, lost or grateful, the Quran holds wisdom and reassurance for every moment.</p>
              <br />
              <p className="text-xl font-medium">No matter what you're going through, there's a message waiting for you.</p>
            </div>

            <div id="sunflower" >
              <img src="./src/assets/sunflowerField.svg" alt="" />
            </div>

          </div>

        </div>

        <div id="emotions" className="flex flex-col justify-center items-center bg-[var(--frame-color)] mt-10 mx-auto p-5 rounded-xl w-[70%] max-lg:w-full">
          <h1 className="text-2xl font-bold">How are you feeling today?</h1>
          <div className="flex gap-5 mt-5 flex-wrap justify-center items-center">
            <button onClick={() => handleEmotion("Happy")}>Happy</button>
            <button onClick={() => handleEmotion("Thankful")}>Thankful</button>
            <button onClick={() => handleEmotion("Anxious")}>Anxious</button>
            <button onClick={() => handleEmotion("Sad")}>Sad</button>
            <button onClick={() => handleEmotion("Lonely")}>Lonely</button>
            <button onClick={() => handleEmotion("Angry")}>Angry</button>
          </div>
        </div>

        <div id="sunnah" className="flex flex-col justify-center items-center bg-[var(--frame-color)] mt-10 mx-auto p-5 rounded-xl w-[70%] max-lg:w-full">
          {
            sunnah == '' ? <h1 className="text-2xl font-bold">Click the button below to generate a Sunnah</h1>:''
          }
          {
              sunnahLoading ?
                <div className="flex flex-col gap-2 justify-center items-center text-center">
                  <Loader size={50} className="animate-spin" />
                  <p className="text-lg text-center font-bold">Generating Sunnah...</p>
                </div>
                :
                <div>
                <p className="text-lg font-medium text-left mb-5">{sunnah}</p>
              </div>
          }
          <button onClick={handleSunnah} className="sunnahButton text-center">Generate Sunnah</button>
          {
            sunnah !=='' && sunnahLoading == false ? <button className="sunnahButton mt-3" onClick={() => setSunnah('')}>Clear</button>:''
          }
        </div>

        <div id="hi" className=" lg:hidden w-full min-h-[200px] p-5 bg-[var(--frame-color)] rounded-xl mt-10">

          <div className="flex flex-col flex-wrap">
            <h1 className="text-4xl font-bold mb-2">Hi you,</h1>
            <p className="text-xl font-medium">life is full of ups and downs and sometimes we just need a guiding light to help us through.</p>
            <br />
            <p className="text-xl font-medium">Whether you're feeling joyful, anxious, lost or grateful, the Quran holds wisdom and reassurance for every moment.</p>
            <br />
            <p className="text-xl font-medium">No matter what you're going through, there's a message waiting for you.</p>
          </div>

          <div id="sunflower" >
            <img src="./src/assets/sunflowerField.svg" alt="" />
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
