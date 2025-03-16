import { useEffect } from "react"

type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE"

export default function useFetch(url: string, method: HTTPMethods, body = {}) {
    async function fetchData() {
        const res = await fetch(url, {method, body: JSON.stringify(body)})
        const payload = await res.json()
        return payload
    }

    useEffect(() => {
        fetchData()
    })
}