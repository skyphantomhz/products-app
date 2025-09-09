import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { ProductService } from '..'
import { RQKeys } from '.'

export const useMutationUpsertProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: any) => ProductService.upsert(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RQKeys.products.all] })
      toast.success('Product saved!')
    },
    onError: (error) => {
      toast.error('Something went wrong')
    }
  })
}

export const useMutationDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: any) => ProductService.deleteById(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RQKeys.products.all] })
      toast.success('Product deleted!')
    },
    onError: (error) => {
      toast.error('Something went wrong')
    }
  })
}
