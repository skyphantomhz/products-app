import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import './App.css'
import { ProductProvider } from './contexts'
import { ProductList, ProductDetail } from './components'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className='App min-h-screen bg-gray-100'>
          <div className='container mx-auto p-8'>
            <ProductProvider>
              <Routes>
                <Route path='/' element={<ProductList />} />
                <Route path='/:id' element={<ProductDetail />} />
              </Routes>
            </ProductProvider>
          </div>
          <ToastContainer position='top-right' />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
