import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState:{
        showGptSearch: false,
        movieNames: null,
        movieResults: null
    },
    reducers: {
        toggleGptSearchView: (state,action) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptMovieResult: (state,action) => {
            const {movieNames,movieResults} = action.payload
            state.movieNames = movieNames
            state.movieResults = movieResults
        },
        clearGptMovies: (state,action) => {
            state.movieNames = null
            state.movieResults = null
        }
    }
})

export default gptSlice.reducer
export const {toggleGptSearchView,addGptMovieResult,clearGptMovies} = gptSlice.actions