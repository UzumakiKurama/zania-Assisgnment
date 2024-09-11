import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './index.css'

async function enableMocking(){
  // if(process.env.NODE_ENV !== "development"){
  //   return;
  // }

  const { browser } = await import("./mocks/browser");

  return browser.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
