import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Header/>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
