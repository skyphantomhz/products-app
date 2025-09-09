import axios from 'axios'
import { Product } from '../types'

const baseURL = 'https://68bf2eab9c70953d96eefa4e.mockapi.io/api/v1/Products'

const getAll = async () => axios.get<Product[]>(baseURL)

const getById = async (id: string) => axios.get<Product>(`${baseURL}/${id}`)

const upsert = async (payload: any) => axios.post(baseURL, payload)

const deleteById = async (payload: any) => {
  const { id } = payload
  if (!id) return
  return axios.delete(`${baseURL}/${id}`)
}

export const ProductService = {
  getAll,
  getById,
  upsert,
  deleteById
}
