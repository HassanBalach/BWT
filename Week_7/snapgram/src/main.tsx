
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QureiesProvider } from './lib/react-query/QureiesProvider.tsx'
// import { AuthContextProvider } from './context/AuthContext.tsx'
{/* <AuthContextProvider>
      </AuthContextProvider> */}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QureiesProvider>
     
        <App />
    </QureiesProvider>
  </BrowserRouter>
)
