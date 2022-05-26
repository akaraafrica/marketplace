import '../styles/globals.scss'
import './_app.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp) 
