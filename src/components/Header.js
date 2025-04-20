import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const user = useSelector(store => store.user)

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

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img
            className='w-44'
            src={LOGO}
            alt='logo'
        />
        {user && <div className='flex p-2'>
            <img
                className='w-12 h-12'
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