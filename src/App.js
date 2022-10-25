import React from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      image: '',
    };
  }



  handleInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('this was submitted', this.state.city);
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITYLOC_API_KEY}&q=${this.state.city}&format=json`

      let cityData = await axios.get(url);

      this.setState({
        cityData: cityData.data[0],
        error: false,
        img: cityData.data[0]
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.message
      })
      console.log('test');
    }

  };



  render() {
    return (
      <>
        <header>
          <h1>null</h1>
        </header>

        <main>
          <Form onSubmit={this.handleSubmit}>
            <label>Pick a City:
              <input type='text' onInput={this.handleInput} />
            </label>
            <button id='blue' typeof='submit'>Explore!</button>
          </Form>
        </main>
        {
          this.state.error
            ?
            <p>{this.state.errorMsg}</p>
            :
            <div>

              <p>{this.state.cityData.display_name}</p>
              <p>{this.state.cityData.lat}</p>
              <p>{this.state.cityData.lon}</p>
              <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITYLOC_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=400x400&maptype='streets'&markers=icon:small-red-cutout|${this.state.cityData.lat}${this.state.cityData.lon}`} alt="map" />
              <p>hunter m fehr</p>
            </div>


        }
      </>
    );
  };
}


export default App;