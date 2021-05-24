import './styles.css';
import React, { useState } from "react";
import api from '../service/api';
import axios from 'axios';
import { Hitory } from '../models/history.model';
import ResultLeft from './ResultLeft';

function Home() {
    const [cityName, setCity] = useState("");
    const [dataCity, setDataCity] = useState({});
    const [lastCity, setLastCity] = useState([]);
    const [topCity, setTopCity] = useState([]);

    function converteTemperatura(kelvin: number){
        const celcius = kelvin - 273.15
        return parseFloat(celcius.toFixed(2))
    }
    
    async function buscarClima(cityName: string){
        const { data } = await axios(
            `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=pt&appid=70a59bf021f595348b10bbbe1a94da04`
        )
        return data
    }

    const onSubmitForm = async (e: any) => {
        e.preventDefault();
        const body = { cityName };
    
        const clima = await buscarClima(body.cityName)
        console.log(clima)
        const objetoHistory: Hitory = {
            city: body.cityName,
            country: clima.sys.country,
            humidity: clima.main.humidity,
            temperature: converteTemperatura(clima.main.temp),
            weather: clima.weather[0].description 
        }
        console.log(objetoHistory);

        await api
          .post("history", objetoHistory)
          .then((response) => {
            setDataCity(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        await api
          .get("history/topFive")
          .then((response) => {
            setTopCity(response.data);
          })
          .catch((error) => console.error(error));
    
        await api.get("history/lastCities").then((response) => {
          setLastCity(response.data);
        });
      };

    return (
        <>
            <div className="app-container">
                <div className="left-container">
                    <h2>Dados sobre as cidades</h2>
                    <form className="form-control" onSubmit={onSubmitForm}>
                        <input
                            type="text"
                            placeholder="Digite a cidade"
                            value={cityName}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button type="submit">PESQUISAR</button>
                    </form>
                    <div className="result">
                        <div>
                            <ResultLeft dataCity={dataCity} />
                        </div>
                    </div>
                </div>

                <div className="right-container">
                    <div className="top-cities">
                        <h2>Cidades mais buscadas</h2>
                        <div className="top-cities-result">
                            {/* <TopCities topCity={topCity} /> */}
                        </div>
                    </div>

                    <div className="last-cities">
                        <h2>Últimas cidades pesquisadas</h2>
                        <div className="last-cities-results">
                            {/* <LastCities lastCity={lastCity} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Home