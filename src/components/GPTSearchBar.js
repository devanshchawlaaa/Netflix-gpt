import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'
import { GoogleGenAI } from "@google/genai";


const GPTSearchBar = () => {
    const langKey = useSelector(store => store.config.lang)
    const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_KEY });
    const dispatch = useDispatch()
    const searchText = useRef(null)

    const searchMovieTMDB = async (movie) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
        const json = await data.json()
        return json?.results
    }

    const getMoviesFromGPT = async (gptQuery) => {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: gptQuery,
          });
          const gptMovieList = String(response.text)?.trim()?.split(', ');
          const promiseArray = gptMovieList?.map(movie => searchMovieTMDB(movie))
          const tmdbResult = await Promise.all(promiseArray)
          dispatch(addGptMovieResult({movieNames: gptMovieList,movieResults: tmdbResult}))
    }

    const handleGptSearchClick = async () => {
        const gptQuery =
            'Act as a Movie Recommendation system and suggest some movies for the query : ' +
            searchText.current.value +
            ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Run"
        getMoviesFromGPT(gptQuery); 
    }

  return (
    <div className='pt-[10%] flex justify-center'>
        <form onSubmit={(e)=>e.preventDefault()} className='w-1/2 bg-black grid grid-cols-12'>
            <input
                type='text'
                className='p-4 m-4 col-span-9'
                placeholder={lang[langKey].gptSearchPlaceholder}
                ref={searchText}
            />
            <button
                className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'
                onClick={handleGptSearchClick}
            >
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GPTSearchBar