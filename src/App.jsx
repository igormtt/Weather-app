import { useEffect, useState } from "react";
import { FcSearch } from 'react-icons/fc'
import { GiTornado } from 'react-icons/gi'
import { BiWind } from 'react-icons/bi'
import { BsDroplet, BsLungs } from 'react-icons/bs'
import { WiSolarEclipse } from 'react-icons/wi'
import { TiCompass } from 'react-icons/ti'
import { BsEye } from 'react-icons/bs'
import '../public/App.css'
import Header from "./Header";
import Footer from "./Footer";

function App () {

  const [location, setLocation] = useState(null)
  const [current, setCurrent] = useState(null)
  const [icon, setIcon] = useState(null)
  const [city, setCity ] = useState('')   
  const [ uv, setUv ] = useState(null)
  const [ aiq, setAIQ ] = useState(null)

  async function getPlace(){
    
    if(city == '' || null){
      return
    }

    const apiCall = await fetch(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_KEY_API}&q=${city}&aqi=yes&alerts=yes`)
    const result = await apiCall.json()
    
    setLocation(result.location)
    setCurrent(result.current)
    setUv(result.current.uv)

    setIcon(result.current.condition.icon)

    if(result.current.uv >= 11 ){
      setUv('Extreme')
    } else if(result.current.uv >= 8){
      setUv('Very high')
    } else if(result.current.uv >= 6){
      setUv('High')  
    } else if (result.current.uv >= 3) {
      setUv('Moderate')
    }else {
      setUv('Low')
    }

    if(result.current.is_day == 1){

      document.body.style.transition = '.7s'
      document.body.style.backgroundColor = '#358eac'

    } else {

      document.body.style.transition = '.7s'
      document.body.style.backgroundColor = '	#4F4F4F'

    }

    switch (result.current.air_quality["us-epa-index"]) {
      case 1:
        setAIQ("Good")
        break;
      case 2:
        setAIQ("Moderate")
        break;
      case 3:
        setAIQ("Unhealthy for sensitive groups")
        break;
      case 4:
        setAIQ("Unhealthy")
        break;
      case 5:
        setAIQ("Very Unhealthy")
        break;
      case 6:
        setAIQ("Hazardous")
        break;
      default:
        setAIQ("")
    }

  }

    return(

    <div className="container">
    
      <Header />

      {!current && (
        <p id="tag_paragraph">Enter city name to get weather data.</p>
      )}

      <div className="content">
          <input className="cityInput" placeholder="Name of City..." onChange={(e)=> {setCity(e.target.value)}} />
          <button className="btn" type="submit" onClick={getPlace}> <FcSearch /> </button>
      </div>

      {current && 
                
        <div className="weather_infos">

        <div className="location">
          
          <div className="top">
            <p>{location.name} ● {location.region} ● {location.country}</p>
          </div>

          <div className="mid">

            <div className="apiIcon">
              <img src={icon}/>
            </div>

              <div className="sideIcon">
                <p className="temperature temp">{current.temp_c}ºC</p>
                <p className="subConditions">Feelslike: {current.feelslike_c}ºC</p>
                <p className="subConditions"> {current.condition.text}</p>
              </div>

          </div>

          <div className="sub_mid">

            <div className="humidity">

              <BsDroplet />
              <h6>Humidity</h6>
              <p>{current.humidity}%</p>

            </div>

              <div className="wind_speed">
                <BiWind />
                <h6>Wind Speed </h6>
                <p>{current.wind_kph}Km/h</p>
              </div>

            <div className="uv_index">
              <WiSolarEclipse />
              <h6>Uv index</h6>
              <p>{uv}</p>
            </div>

          </div>

        <div className="bottom">
          
          <div className="infos_bottom">

            <p> <TiCompass /> Wind direction: <span> {current.wind_dir} </span> </p>
            <p><BsLungs /> AQ index: <span> {aiq} </span> </p>
            <p><BsEye /> Visibility: <span> {current.vis_km} </span> </p>
            <p><GiTornado /> Wind Gust: <span> {current.gust_kph} Km/h </span> </p>

          </div>

        </div>

        </div>

        </div>

     }

     <Footer />
      
    </div>
    )
  
}

export default App
