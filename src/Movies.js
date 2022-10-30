import React from 'react';

class Movies extends React.Component{
  render(){
    return(
      <>
      <h1>Movies</h1>
      <div id='movies'>
        {this.props.movieData.map(movie => (
          <artical>
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
          </artical>
        ))}
      </div>
      </>
    )
  }
}



export default Movies;