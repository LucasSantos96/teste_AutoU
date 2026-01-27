
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ImprodutivoResultPage } from './pages/result/improdutivo'
import { ProdutivoResultPage } from './pages/result/produtivo'
import { NotFoundPage } from './pages/not-found'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/productive" element={<ProdutivoResultPage />} />
      <Route path="/improductive" element={<ImprodutivoResultPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>,
)
