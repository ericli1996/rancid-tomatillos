import React, { Component } from 'react';
import './Details.css';
import './images/back-arrow.svg';
import { Link } from "react-router-dom";
import { fetchSingleMovie } from './apiCalls';
const dayjs = require('dayjs');

class Details extends Component {
  constructor() {
    super();
      this.state = {
        details: {},
        error: '',
        isLoadingDetails: false
      }
  }

  componentDidMount() {
    this.setState({ isLoadingDetails: true })
    fetchSingleMovie(this.props.selectedID)
       .then(data => this.setState({ details: data.movie, isLoadingDetails: false }))
       .catch(error => this.setState({ error: error.message, isLoadingDetails: false }))
  }

  render() {
    const movie = this.state.details;
    return (
      <div className="detail-page">
        {this.state.isLoadingDetails && <h2>Loading Movie Details...</h2>}
        {this.state.error &&
          <div className='error-page'>
            <h2 className='error-message'>{ this.state.error }</h2>
            <Link to="/">
              <img src={ '/back-arrow.svg' } className='arrow-icon' alt='Back arrow' />
            </Link>
          </div> }
       {movie.title && !this.state.error &&
         <div className='movie-details'>
          <div className='movie-info'>
            <div className='title-container'>
              <h1 className='movie-title text'>{ movie.title }</h1>
            </div>
            { movie.tagline && <p className='tagline text'><em>{ `"${ movie.tagline }"` }</em></p> }
            <p className='detail-rating text'>{`⭐️  ${ movie.average_rating.toFixed(1)} `}</p>
            <p className='movie-overview text'>{ movie.overview }</p>
            { movie.budget > 0 && <p className='budget text'>Budget: $ { movie.budget }</p> }
            { movie.revenue > 0 && <p className='revenue text'>Revenue: $ { movie.revenue }</p> }
            <p className='runtime text'>Runtime: { movie.runtime } mins</p>
            <p className='movie-releaseDate text'>Released on { dayjs(movie.release_date).format('MMMM DD, YYYY') }</p>
            <Link to="/">
              <img src={ '/back-arrow.svg' } className='arrow-icon' alt='Back arrow' />
            </Link>
            </div>
          <img className='movie-cover' src={ movie.poster_path } alt={ `${ movie.title } Poster` }/>
          <img className='movie-backdrop' src={ movie.backdrop_path } alt={ `${ movie.title } Backdrop` }/>
          </div>
    }
    </div>
    )
  }
 }

export default Details;
