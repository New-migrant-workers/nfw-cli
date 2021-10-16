import { apiPost, apiGet, apiDelete, apiPut } from './apiMethods'

export const apiLogin = (params?: any) => apiPost('/auth', params)

export const apiLogin1 = (params?: any) => apiGet('/auth', params)

export const apiLogin2 = (params?: any) => apiPut('/auth', params)

export const apiLogin3 = () => apiDelete('/auth')
