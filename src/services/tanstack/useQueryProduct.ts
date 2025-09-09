import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { RQKeys } from '.'
import { ProductService } from '..'
import { Product } from '../../types'

export const useQueryProduct = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [RQKeys.products.detail, id],
    queryFn: () => ProductService.getById(id)
  })

  const transformedData = React.useMemo(() => {
    if (error || isLoading || !data) return {} as Product
    return data.data
  }, [data, error, isLoading])

  return { data: transformedData, error, isLoading }
}
