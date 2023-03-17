import React from 'react'
import { auth, provider } from '../firebase/config'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

function LoginPage() {
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credentials = GoogleAuthProvider.credentialFromResult(result)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    return (
        <>
            <div className='flex justify-center items-center h-[100vh]'>
                <button className='bg-white text-blue-600 font-bold px-3 py-2' onClick={signIn}>
                    Sign In With Google
                </button>
            </div>
        </>
    )
}

export default LoginPage