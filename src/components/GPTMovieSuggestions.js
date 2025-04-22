import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GPTMovieSuggestions = () => {
    const {movieNames,movieResults} = useSelector(store => store.gpt)
    if(movieNames === null) return null
  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-70'>
        {movieNames?.map((movieName,index) => (
            <MovieList key={movieName} title={movieName} movies={movieResults[index]} />
        ))}
    </div>
  )
}

export default GPTMovieSuggestions