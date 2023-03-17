import { signOut } from 'firebase/auth'
import React from 'react'
import { db, auth, provider } from '../firebase/config'
function SignOut() {
    const signout = () => {
        signOut(auth)
    }
    return <>
        <button onClick={signout} className="px-2 font-bold rounded-sm shadow-xl py-2 mt-4 bg-red-700 text-white">
            Sign Out
        </button>
    </>
}

export default SignOut