import './css/Header.module.css'
import {TiWeatherWindyCloudy} from 'react-icons/ti'

function Header (){
    return(
        <header>
            <p> <TiWeatherWindyCloudy /> Weather App </p> 
        </header>
    )
}

export default Header