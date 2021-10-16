import http from './http'

export function apiGet<T>(url: string, params?: any) {
    return new Promise(async (resolve) => {
        const res = await http.get<T>(url, params)
        resolve(res.data)
    })
}
export function apiPost<T>(url: string, data?: any) {
    return new Promise(async (resolve) => {
        const res = await http.post<T>(url, data)
        resolve(res.data)
    })
}

export function apiPut<T>(url: string, data?: any) {
    return new Promise(async (resolve) => {
        const res = await http.put<T>(url, data)
        resolve(res.data)
    })
}

export function apiDelete<T>(url: string, params?: any) {
    return new Promise(async (resolve) => {
        const res = await http.delete<T>(url, params)
        resolve(res.data)
    })
}
