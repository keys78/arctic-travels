import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function MyApp({ Component, pageProps, router }: AppProps) {
  const AnyComponent = Component as any;
  
  return<div className='layout'>
  <AnimatePresence
    exitBeforeEnter={true}
    initial={false}
    onExitComplete={() => window.scrollTo(0, 0)}
  >
    <Provider store={store} >
    <AnyComponent {...pageProps} key={router.route} />
    </Provider>
  </AnimatePresence>

  <ToastContainer limit={2} />
</div>
}

export default MyApp