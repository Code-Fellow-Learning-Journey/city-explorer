import React from 'react';

class Weather extends React.Component {
  render() {
    return (
      <>
        <h1>Weather</h1>
        <div id='weather'>
          {
            this.props.weatherData.map(day => (
              <article>
                <p>{day.weather}</p>
                <p>{day.date}</p>
              </article>
            ))
          }
        </div>
      </>
    )
  }
}



export default Weather;