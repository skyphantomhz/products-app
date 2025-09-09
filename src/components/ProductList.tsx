import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Product } from '../types/Product'
import { useProductContext } from '../contexts'
import { formatCurrency, formatDate, safeSplit } from '../utils'
import { ProductForm } from '.'

const ProductList: React.FC = () => {
  const {
    products,
    isLoading = false,
    modalState,
    onOpenModal,
    onCloseModal,
    onUpsertProduct,
    onDeleteProduct
  } = useProductContext()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const handleProductClick = (product: Product) => () => {
    navigate(`/${product._id}`)
  }

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return products || []

    return (products || []).filter(
      (product) =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.materials.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  }, [products, debouncedSearchTerm])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center p-8'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
        <span className='ml-3 text-gray-600'>Loading...</span>
      </div>
    )
  }

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Product Management</h1>
        <button
          onClick={() => onOpenModal()}
          className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow transition-colors'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
          Create
        </button>
      </div>

      <div className='mb-6'>
        <div className='flex justify-between items-center mb-3'>
          <div className='relative max-w-md flex-1'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search products by name, description, or materials...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                <svg
                  className='h-5 w-5 text-gray-400 hover:text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            )}
          </div>
          <div className='ml-4 text-sm text-gray-600'>
            Showing {filteredProducts.length} of {products?.length || 0} products
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow-md'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b'>Product</th>
              <th className='px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b'>
                Description
              </th>
              <th className='px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b'>Price</th>
              <th className='px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b'>Materials</th>
              <th className='px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b'>Created At</th>
              <th className='px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className='px-4 py-2 text-center text-gray-500'>
                  {debouncedSearchTerm
                    ? `No products found matching "${debouncedSearchTerm}"`
                    : 'No products available'}
                </td>
              </tr>
            )}
            {filteredProducts.map((product) => (
              <tr key={product._id} className='hover:bg-blue-50 transition-colors'>
                <td className='px-4 py-2 border-b'>
                  <div className='flex items-center gap-3 min-w-[180px]'>
                    <div className='w-12 h-12 flex items-center justify-center bg-gray-50 rounded overflow-hidden border shadow'>
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
                    <span
                      className='font-medium text-gray-800 cursor-pointer hover:text-blue-600 truncate max-w-[150px]'
                      onClick={handleProductClick(product)}
                      title={product.name}
                    >
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className='px-4 py-2 border-b text-gray-600 max-w-xs truncate' title={product.description}>
                  {product.description}
                </td>
                <td className='px-4 py-2 border-b text-green-600 font-bold'>{formatCurrency(product.price)}</td>
                <td className='px-4 py-2 border-b'>
                  <div className='flex flex-wrap gap-1'>
                    {safeSplit(product.materials).map((material, index) => (
                      <span key={index} className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                        {material}
                      </span>
                    ))}
                  </div>
                </td>
                <td className='px-4 py-2 border-b text-xs text-gray-500'>{formatDate(product.created_at)}</td>
                <td className='px-4 py-2 border-b text-center'>
                  <button
                    onClick={handleProductClick(product)}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 text-xs font-medium'
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product._id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium'
                    title='Delete Product'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ProductForm
          isOpen={modalState.type !== 'closed'}
          onClose={onCloseModal}
          product={modalState.type === 'edit' ? modalState.product : undefined}
          onSubmit={(data) => onUpsertProduct(data)}
        />
      </div>
    </div>
  )
}

export default ProductList
