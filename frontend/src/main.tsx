import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
const env = import.meta.env;

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={`${env.VITE_GOOGLE_CLIENT_ID}`}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </GoogleOAuthProvider>
)
