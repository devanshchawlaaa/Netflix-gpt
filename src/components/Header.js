import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { clearGptMovies, toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const showGptSearch = useSelector(store => store.gpt.showGptSearch)

    const handleSignOut = () => {
        signOut(auth).then(() => {}).catch((error) => {
            navigate('/error')
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid,email,displayName,photoURL} = user;
                dispatch(addUser({uid,email,displayName,photoURL}))
                navigate('/browse')
            } else {
                dispatch(removeUser())
                navigate('/')
            }
        });
        
        return () => unsubscribe()
    }, [])

    const handleGPTSearchClick = () => {
        dispatch(clearGptMovies())
        dispatch(toggleGptSearchView())
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row md:justify-between'>
        <img
            className='w-44 mx-auto md:mx-0'
            src={LOGO}
            alt='logo'
        />
        {user && 
            <div className='flex p-2 justify-between'>
                {showGptSearch && 
                    <select className='p-2 m-2 bg-gray-700 text-white' onChange={handleLanguageChange}>
                        {SUPPORTED_LANGUAGES.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
                    </select>
                }
                <button
                    className='px-4 py-2 mx-4 my-2 bg-purple-800 text-white rounded-lg cursor-pointer'
                    onClick={handleGPTSearchClick}
                >
                    {showGptSearch ? 'Home Page' : 'GPT Search'}
                </button>
                <img
                    className='w-12 h-12 hidden md:block'
                    alt='usericon'
                    // src='https://occ-0-1492-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABeuqjuQsRgqEDlibtJTI5BMf8IxhLlLOeIT6xI4TL57mqv7XHja43gx02S8pZVe8JNGRQXjnrUk1VcsTXqi83tFKPI6OR3k.png?r=bd7'
                    src={user?.photoURL}
                />
                <button onClick={handleSignOut} className='font-bold text-white cursor-pointer'>Sign Out</button>
        </div>}
    </div>
  )
}

export default Header