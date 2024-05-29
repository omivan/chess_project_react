import React from 'react';
import WeatherWidget from './WeatherWidget';
import {ChessContainer} from "../styles";

function Weather() {
    return (
        <ChessContainer>
            <div>
                <h1>Weather Information</h1>
                <WeatherWidget />
            </div>
        </ChessContainer>
    );
}

export default Weather;