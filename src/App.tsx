import { useEffect, useState } from "react"
import { ArrowUp, Loader, X } from "lucide-react"
import { generateContent, generateDeenBuddy } from "./components/Model"
import { promptAngry, promptAngryNL, promptAnxious, promptAnxiousNL, promptHappy, promptHappyNL, promptLonely, promptLonelyNL, promptSad, promptSadNL, promptThankful, promptThankfulNL } from "./components/ModelTexts"

function App() {
  // const [response, setResponse] = useState<Puter>()
  const [response, setResponse] = useState<string>('')
  const [emotion, setEmotion] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [verse, setVerse] = useState<string>('')
  const [soera, setSoera] = useState<string>('')
  const [extraInfo, setExtraInfo] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('')
  const [chat, setChat] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>('nl')

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
    let prompt = ""

    switch (emotion) {
      case 'Happy':
        if (language === 'nl') {
          prompt = promptHappyNL
        } else prompt = promptHappy
        break;
      case 'Thankful':
        if (language === 'nl') {
          prompt = promptThankfulNL
        } else prompt = promptThankful
        break;
      case 'Anxious':
        if (language === 'nl') {
          prompt = promptAnxiousNL
        } else prompt = promptAnxious
        break;
      case 'Sad':
        if (language === 'nl') {
          prompt = promptSadNL
        } else prompt = promptSad
        break;
      case 'Lonely':
        if (language === 'nl') {
          prompt = promptLonelyNL
        } else prompt = promptLonely
        break;
      case 'Angry':
        if (language === 'nl') {
          prompt = promptAngryNL
        } else prompt = promptAngry
        break;
      default:
        prompt = `Give me an uncommon ayah that fits the emotion of ${emotion}. The return should look like this example: ""And do not lose hope in the mercy of Allah." / (Surah Az-Zumar, 39:53) / a reflection, keep it VERY short`;
    }

    const reply: string = await generateContent(prompt);

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
    let info: string = ""
    if (language === 'nl') {
      info = "Om te starten, selecteer eerst hoe je vandaag voelt."
    } else info = "Start by selecting how you feel today."
    return <div className="flex flex-col text-left">
      <h1 className="text-4xl font-bold mb-2">Hi Fatma,</h1>
      <p className="text-xl font-medium">{info}</p>
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

  const handleSunnah = async () => {
    setSunnahLoading(true)
    const genSunnah = await generateContent('Give me a sunnah for today')
    setSunnah(genSunnah)
    setSunnahLoading(false)
  }

  const handleUserInput = async () => {
    const userInputValue = userInput.trim();
    setChat([...chat, userInputValue])
    setUserInput('')
    const genDeenBuddy: string = await generateDeenBuddy(userInputValue)
    setTimeout(() => {
      setChat([...chat, userInputValue, genDeenBuddy])
    }, 100) // delay for 100ms
  }

  const handleClearChat = () => {
    setChat([])
  }

  const chatStyle = () =>{
    return "chat-bubble max-w-[80%] max-lg:max-w-[90%] text-left rounded-xl p-3 text-wrap break-words font-bold"
  }

  useEffect(() => {
    console.log(language)
  },[language])


  return (
    <div className="flex w-full h-full justify-center items-center flex-col p-10">

      <div className="flex gap-5">
        <button className="languageBtn" onClick={() => setLanguage('en')}>EN</button>
        <button className="languageBtn" onClick={() => setLanguage('nl')}>NL</button>
      </div>

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
            <img src="/fatmaPraying.png" alt="" />
          </div>

          <div id="hi" className="max-lg:hidden w-[35%] max-lg:w-full min-h-[500px] p-5 bg-[var(--frame-color)] rounded-xl">

            <div className="flex flex-col flex-wrap">
              <h1 className="text-4xl font-bold mb-2">Hi you,</h1>
              <p className="text-xl font-medium">{language === 'nl' ? "Het leven zit vol ups en downs en soms hebben we gewoon een leidend licht nodig om ons er doorheen te helpen." : "Life is filled with ups and downs and sometimes we just need a guiding light to help us through it."}</p>
              <br />
              <p className="text-xl font-medium">{language === 'nl' ? "Of je je nu blij, angstig, verloren of dankbaar voelt, de Koran bevat wijsheid en geruststelling voor elk moment." : "Whether you're feeling happy, anxious, lost, or thankful, the Quran has wisdom and peace for each moment."}</p>
              <br />
              <p className="text-xl font-medium">{language === 'nl' ? "Wat je ook doormaakt, er wacht een boodschap op je." : "No matter what you're going through, there's a message waiting for you."}</p>
            </div>

            <div id="sunflower" >
              <img src="/sunflowerField.svg" alt="" />
            </div>

          </div>

        </div>

        <div id="emotions" className="flex flex-col justify-center items-center bg-[var(--frame-color)] mt-10 mx-auto p-5 rounded-xl w-[70%] max-lg:w-full">
          <h1 className="text-2xl font-bold">{language === 'nl' ? "Hoe voel je je vandaag?" : "How are you feeling today?"}</h1>
          <div className="flex gap-5 mt-5 flex-wrap justify-center items-center">
            <button onClick={() => handleEmotion("Happy")}>{language === 'nl' ? "Gelukkig" : "Happy"}</button>
            <button onClick={() => handleEmotion("Thankful")}>{language === 'nl' ? "Dankbaar" : "Thankful"}</button>
            <button onClick={() => handleEmotion("Anxious")}>{language === 'nl' ? "Angstig" : "Anxious"}</button>
            <button onClick={() => handleEmotion("Sad")}>{language === 'nl' ? "Droevig" : "Sad"}</button>
            <button onClick={() => handleEmotion("Lonely")}>{language === 'nl' ? "Eenzaam" : "Lonely"}</button>
            <button onClick={() => handleEmotion("Angry")}>{language === 'nl' ? "Boos" : "Angry"}</button>
          </div>
        </div>

        <div id="sunnah" className="flex flex-col justify-center items-center bg-[var(--frame-color)] mt-10 mx-auto p-5 rounded-xl w-[70%] max-lg:w-full">
          {
            sunnah == '' ? <h1 className="text-2xl font-bold text-center">{language === 'nl' ? "Klik op de onderstaande knop om een Sunnah te genereren" : "Click the button below to generate a Sunnah"}</h1> : ''
          }
          {
            sunnahLoading ?
              <div className="flex flex-col gap-2 justify-center items-center text-center">
                <Loader size={50} className="animate-spin" />
                <p className="text-lg text-center font-bold">{language === 'nl' ? "Sunnah wordt gegenereerd" : "Sunnah is being generated"}</p>
              </div>
              :
              <div>
                <p className="text-lg font-medium text-left mb-5">{sunnah}</p>
              </div>
          }
          <button onClick={handleSunnah} className="sunnahButton text-center">{language === 'nl' ? "Genereer Sunnah" : "Generate Sunnah"}</button>
          {
            sunnah !== '' && sunnahLoading == false ? <button className="sunnahButton mt-3" onClick={() => setSunnah('')}>{language === 'nl' ? "Verwijder" : "Clear"}</button> : ''
          }
        </div>

        <div id="deen" className="flex flex-col h-[500px] justify-center items-center bg-[var(--frame-color)] mt-10 mx-auto p-5 rounded-xl w-[70%] max-lg:w-full">
          {
            chat.length == 0 ?
              ''
              :
              <div id="clearChat" onClick={handleClearChat}>
                <X />
              </div>
          }
          <div className="w-full flex flex-col justify-between items-center gap-3">
            <div id="chatBox" className="h-[400px] w-[80%] overflow-y-auto overflow-x-hidden">
              {
                chat.length == 0 ?
                  <p className="text-center text-2xl font-bold">{language === 'nl' ? "Start een chat met DeenBuddy" : "Start a chat with DeenBuddy"}</p>
                  :
                  <div className="w-full flex flex-col gap-2">
                    {
                      chat.map((message, index) => (
                        <p key={index} className={index % 2 == 0 ? `${chatStyle()} bg-[var(--bg-color)]  ml-auto` : `${chatStyle()} bg-[var(--chat-ai-color)] mr-auto`}>{message}</p>
                      ))
                    }
                  </div>
              }
            </div>
            <div className="flex w-full gap-3 items-center">
              <input className="p-3 rounded-xl w-full" value={userInput} onKeyDown={(e) => e.key === 'Enter' && handleUserInput()} onChange={(e) => setUserInput(e.target.value)} placeholder={language === 'nl' ? "Vraag aan DeenBuddy" : "Ask DeenBuddy"} />
              <div id="arrow" onClick={handleUserInput}>
                <ArrowUp />
              </div>
            </div>
          </div>
        </div>

        <div id="hi" className=" lg:hidden w-full min-h-[200px] p-5 bg-[var(--frame-color)] rounded-xl mt-10">

          <div className="flex flex-col flex-wrap">
            <h1 className="text-4xl font-bold mb-2">Hi you,</h1>
            <p className="text-xl font-medium">{language === 'nl' ? "Het leven zit vol ups en downs en soms hebben we gewoon een leidend licht nodig om ons er doorheen te helpen." : "Life is filled with ups and downs and sometimes we just need a guiding light to help us through it."}</p>
            <br />
            <p className="text-xl font-medium">{language === 'nl' ? "Of je je nu blij, angstig, verloren of dankbaar voelt, de Koran bevat wijsheid en geruststelling voor elk moment." : "Whether you're feeling happy, anxious, lost, or thankful, the Quran has wisdom and peace for each moment."}</p>
            <br />
            <p className="text-xl font-medium">{language === 'nl' ? "Wat je ook doormaakt, er wacht een boodschap op je." : "No matter what you're going through, there's a message waiting for you."}</p>
          </div>

          <div id="sunflower" >
            <img src="/sunflowerField.svg" alt="" />
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
