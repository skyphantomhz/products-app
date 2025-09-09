import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { RQKeys } from '.'
import { ProductService } from '..'
import { Product } from '../../types'

const transformeData = (data: Product[]) => {
  return data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export const useQueryProducts = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [RQKeys.products.all],
    queryFn: () => ProductService.getAll()
  })

  const transformedData = React.useMemo(() => {
    if (error || isLoading || !data) return []
    return transformeData(data.data)
  }, [data, error, isLoading])

  return { data: transformedData, error, isLoading, refetch }
}
