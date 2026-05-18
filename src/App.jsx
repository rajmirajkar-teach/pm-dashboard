import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import DesignSystem from '@/pages/DesignSystem'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/design-system" element={<DesignSystem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
