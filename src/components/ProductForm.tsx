import React, { useState, useEffect } from 'react'

import { Product } from '../types/Product'

interface ProductFormProps {
  isOpen: boolean
  product?: Product | null
  onClose: () => void
  onSubmit: (data: Product) => void
  isLoading?: boolean
}

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, onSubmit, product = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    _id: 'create',
    created_at: '',
    name: '',
    description: '',
    price: '',
    materials: '',
    image: ''
  })

  const [errors, setErrors] = useState<Partial<typeof formData>>({})

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          materials: product.materials,
          image: product.image,
          ...product
        })
      } else {
        setFormData({
          _id: 'create',
          created_at: '',
          name: '',
          description: '',
          price: '',
          materials: '',
          image: ''
        })
      }
      setErrors({})
    }
  }, [isOpen, product])

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    }
    if (!formData.materials.trim()) {
      newErrors.materials = 'Materials are required'
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-800'>{product ? 'Edit Product' : 'Create New Product'}</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 focus:outline-none'
            disabled={isLoading}
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6'>
          <div className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2 text-left'>
                Name *
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter product name'
                disabled={isLoading}
              />
              {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-2 text-left'>
                Description *
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter product description'
                disabled={isLoading}
              />
              {errors.description && <p className='mt-1 text-sm text-red-600'>{errors.description}</p>}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label htmlFor='price' className='block text-sm font-medium text-gray-700 mb-2 text-left'>
                  Price *
                </label>
                <input
                  type='number'
                  id='price'
                  name='price'
                  value={formData.price}
                  onChange={handleInputChange}
                  inputMode='decimal'
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='Example: 99.99'
                  disabled={isLoading}
                />
                {errors.price && <p className='mt-1 text-sm text-red-600'>{errors.price}</p>}
              </div>

              <div>
                <label htmlFor='materials' className='block text-sm font-medium text-gray-700 mb-2 text-left'>
                  Materials *
                </label>
                <input
                  type='text'
                  id='materials'
                  name='materials'
                  value={formData.materials}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.materials ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='Example: Cotton, Polyester'
                  disabled={isLoading}
                />
                {errors.materials && <p className='mt-1 text-sm text-red-600'>{errors.materials}</p>}
              </div>
            </div>

            <div>
              <label htmlFor='image' className='block text-sm font-medium text-gray-700 mb-2 text-left'>
                Image URL *
              </label>
              <input
                type='url'
                id='image'
                name='image'
                value={formData.image}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='https://example.com/image.jpg'
                disabled={isLoading}
              />
              {errors.image && <p className='mt-1 text-sm text-red-600'>{errors.image}</p>}

              {formData.image && (
                <div className='mt-3'>
                  <p className='text-sm text-gray-600 mb-2 text-left'>Preview:</p>
                  <img
                    src={formData.image}
                    alt='Preview'
                    className='w-24 h-24 object-contain border rounded bg-gray-50'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className='flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500'
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center'
              disabled={isLoading}
            >
              {isLoading && <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>}
              {product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
