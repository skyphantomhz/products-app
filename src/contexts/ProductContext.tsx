import React, { createContext, useContext, ReactNode } from 'react'

import { useMutationDeleteProduct, useMutationUpsertProduct, useQueryProducts } from '../services'
import { Product } from '../types'

interface ModalState {
  type: 'closed' | 'create' | 'edit'
  product?: Product | undefined
}

interface ProductContextType {
  products: Product[]
  isLoading: boolean
  modalState: ModalState
  onUpsertProduct: (product: Product) => void
  onDeleteProduct: (productId: string) => void
  onOpenModal: (product?: Product) => void
  onCloseModal: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

interface ProductProviderProps {
  children: ReactNode
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const { data: products, isLoading, refetch } = useQueryProducts()
  const [modalState, setModalState] = React.useState({ type: 'closed' } as ModalState)
  const { mutate: deleteProduct } = useMutationDeleteProduct()
  const { mutate: upsertProduct } = useMutationUpsertProduct()

  const handleOpenModal = React.useCallback(
    (product?: Product) => {
      setModalState({ type: product ? 'edit' : 'create', product })
    },
    [setModalState]
  )

  const handleCloseModal = React.useCallback(() => {
    setModalState({ type: 'closed' })
  }, [setModalState])

  const handleUpsertProduct = React.useCallback(
    async (product: Product) => {
      const id = product._id === 'create' ? (products ? products.length + 1 : 1) : product._id
      const createdAt = product._id === 'create' ? new Date().toISOString() : product.created_at
      await upsertProduct({ ...product, _id: id, created_at: createdAt })
      handleCloseModal()
      refetch()
    },
    [handleCloseModal, products, refetch, upsertProduct]
  )

  const handleDeleteProduct = React.useCallback(
    (id: string) => {
      deleteProduct({ id })
    },
    [deleteProduct]
  )

  const value: ProductContextType = React.useMemo(
    () => ({
      products: products || [],
      isLoading,
      modalState,
      onUpsertProduct: handleUpsertProduct,
      onDeleteProduct: handleDeleteProduct,
      onOpenModal: handleOpenModal,
      onCloseModal: handleCloseModal
    }),
    [products, isLoading, modalState, handleOpenModal, handleCloseModal, handleUpsertProduct, handleDeleteProduct]
  )
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext)

  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }

  return context
}

export default ProductContext
