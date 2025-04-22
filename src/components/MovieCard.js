import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({movie}) => {
    const {poster_path = ''} = movie
  return (
    <div className='w-36 md:w-48 pr-4'>
        <img
            src={IMG_CDN+poster_path}
            alt='Movie Card'
        />
    </div>
  )
}

export default MovieCard