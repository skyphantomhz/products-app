import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useQueryProduct } from '../services/tanstack'
import { formatCurrency, formatDate, safeSplit } from '../utils'

const ProductDetail: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: product, isLoading } = useQueryProduct(id)

  if (isLoading) {
    return <div className='p-8 text-center text-gray-500'>Loading...</div>
  }

  return (
    <div className='max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-6'>
      <button
        className='flex items-center text-blue-600 hover:text-blue-800 mb-4 focus:outline-none'
        onClick={() => navigate(-1)}
        title='Go back'
      >
        <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
        </svg>
        Go back
      </button>

      <div className='flex flex-col md:flex-row gap-6 items-center'>
        <div className='flex-shrink-0 w-48 h-48 bg-gray-50 rounded overflow-hidden border shadow flex items-center justify-center'>
          <img
            src={product.image || '/placeholder.jpg'}
            alt={product.name}
            className='w-full h-full object-contain'
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder.jpg'
            }}
          />
        </div>
        <div className='flex-1'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>{product.name}</h2>
          <div className='text-gray-600 mb-4'>{product.description}</div>
          <div className='flex flex-wrap gap-4 items-center mb-2'>
            <span className='text-xl text-blue-600 font-bold'>{formatCurrency(product.price)}</span>
            {safeSplit(product.materials).map((material, index) => (
              <span key={index} className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                {material}
              </span>
            ))}
          </div>
          <div className='text-xs text-gray-400'>Created at: {formatDate(product.created_at)}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
