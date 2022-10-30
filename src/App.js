import React from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Movies from './Movies';
import Weather from './Weather';





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMsg: '',
      image: '',
      weatherData: [],
      movieData: [],
    }
  }



  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();
    console.log(this.state.city);
    let response;
    try {
      let locationURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_API_KEY}&q=${this.state.city}&format=json`


      console.log(locationURL)

      response = await axios.get(locationURL);


      console.log(response)
      let location = response.data[0];

      //call weather function and call in the location

      //call movie 

      console.log(location);
      console.log(location.lat)
      this.getMovies();

      this.setState({
        cityData: response.data[0],
        error: false,
        lat: location.lat,
        lon: location.lon,
      }, () => this.getWeatherData(this.state.cityData))

    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMsg: error.message
      })
      console.log('test');
    }
  }

  getWeatherData = async (location) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${location.lat}&lon=${location.lon}`

      console.log(url);

      let weatherResponse = await axios.get(url)
      console.log(weatherResponse.data);
      this.setState({
        weatherData: weatherResponse.data
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.message
      });
    }
  }

  getMovies = async () => {
    try {
      let movieURL = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`;
      let movieResponse = await axios.get(movieURL);
      this.setState({
        movieData: movieResponse.data
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.message
      });
    }
  }

  getSecondaryData = () => {
    this.getWeatherData();
    //this.getMovies();
  }


  render() {
    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>

        <main>
          <Form onSubmit={this.getCityData}>
            <label>Pick a City:
              <input type='text' onInput={this.handleInput} />
            </label>
            <button id='blue' typeof='submit'>Explore!</button>
          </Form>
          {
            this.state.error
              ?
              <p>{this.state.errorMsg}</p>
              :

            
              <div>

                <p>{this.state.cityData.display_name}</p>
                <p>{this.state.cityData.lat}</p>
                <p>{this.state.cityData.lon}</p>
                {this.state.lat &&
                  <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12&size=400x400`} alt="map" />}
                <p>hunter m fehr</p>
              </div>
          }
                <Weather weatherData={this.state.weatherData} />

                <Movies movieData={this.state.movieData} />
              </main>
            </>
                );

        }
        }
        


  
          
     
        export default App;