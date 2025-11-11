import { BrowserRouter, Routes, Route } from 'react-router-dom'

import StartingPage from './pages/starting-page'
import BlocksDemo from './pages/blocks-demo'

export default function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path="/blocks-demo" element={<BlocksDemo />} />
        </Routes>
      </div>

    </BrowserRouter>
  )
}