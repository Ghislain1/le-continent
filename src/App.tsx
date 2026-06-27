import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/menu" element={<Layout><Menu /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
