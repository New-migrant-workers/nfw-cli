import http from './http'

export async function apiGet<T>(url: string, params?: any) {
    const res = await http.get<T>(url, params)
    return Promise.resolve(res)
}
export async function apiPost<T>(url: string, data?: any) {
    const res = await http.post<T>(url, data)
    return Promise.resolve(res)
}

export async function apiPut<T>(url: string, data?: any) {
    const res = await http.put<T>(url, data)
    return Promise.resolve(res.data)
}

export async function apiDelete<T>(url: string, params?: any) {
    const res = await http.delete<T>(url, params)
    return Promise.resolve(res)
}
