import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { store } from '../app/store'
import { Provider } from 'react-redux'




function MyApp({ Component, pageProps, router }: AppProps) {

  return (
    <div className='layout'>
      <AnimatePresence
        exitBeforeEnter={true}
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Provider store={store} >
        <Component {...pageProps} key={router.route} />
        </Provider>
      </AnimatePresence>
    </div>
  )
}

export default MyApp
