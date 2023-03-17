'use client'
import { Inter } from 'next/font/google'
import { auth } from "../../firebase/config"
import { useAuthState } from 'react-firebase-hooks/auth'
import MainPage from '../../component/mainPage'
import LoginPage from '../../component/loginPage'
export default function Home() {
  const [user] = useAuthState(auth);
  return user ? <MainPage email={user?.email} /> : <LoginPage />
}
