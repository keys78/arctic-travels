import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'




function MyApp({ Component, pageProps, router }: AppProps) {

  return (
    <div className='layout'>
      <AnimatePresence
        exitBeforeEnter={true}
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </div>
  )
}

export default MyApp
