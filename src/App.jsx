import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import DesignSystem from '@/pages/DesignSystem'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DesignSystem />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
