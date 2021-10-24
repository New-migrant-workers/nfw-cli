import { apiPost, apiGet, apiDelete, apiPut } from './apiMethods'

export const postUser = (params?: any) => apiPost('/user', params)

export const getUser = (params?: any) => apiGet('/user', params)

export const apiLogin2 = (params?: any) => apiPut('/auth', params)

export const apiLogin3 = () => apiDelete('/auth')
