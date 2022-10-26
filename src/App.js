import React from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { hasUnreliableEmptyValue } from '@testing-library/user-event/dist/utils';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMsg: '',
      image: '',
      lat: '',
      lon: '',
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
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY_API_KEY}&q=${this.state.city}&format=json`

      let urlBack = `${process.env.REACT_APP_SERVER}/weather?cityName=${this.state.weather}`;

      let weatherData = await axios.get(urlBack);

      console.log(url)

      console.log(weatherData.data);
    



      response = await axios.get(url);

      console.log(response)
      let location = response.data[0];

      console.log(location);
      console.log(location.lat)

      this.setState({
        cityData: response.data[0],
        error: false,
        lat: location.lat,
        lon: location.lon,
      })

    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMsg: error.message
      })
      console.log('test');
    }
  }
};

//         cityData: location,
//         error: false,
//         lat: location.lat,
//         lon:location.lon,
//         //map: urlmap
//       }, () => {
//           this.getMapData();

//       });

//     }
//   }  
// };

// getMapData =async()=>{
//   console.log()
// }

render() {
  return (
    <>
      <header>
        <h1>null</h1>
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
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=400x400&maptype='streets'&markers=icon:small-red-cutout|${this.state.cityData.lat}${this.state.cityData.lon}`} alt="map" />
        <p>hunter m fehr</p>
      </div>
      </main>

    </>
        }
        
  );
};




export default App;