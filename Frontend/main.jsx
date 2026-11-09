import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Payment from "../Frontend/src/Component/Payment.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Payment />
  </StrictMode>,
)