import {useState, useEffect} from "react"
import useGlobalState from "../context/GlobalContext"

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS"

export default function useFetch<T>(url: string, method: Method, options?: RequestInit) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<unknown | null>(null)
    const [payload, setPayload] = useState<T>({} as T)
    const {shouldRefetch} = useGlobalState()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                const res = await fetch(url, {method, ...options})
                setPayload(await res.json())
            }
            catch (e) {
                setError(e)
            }
            finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [shouldRefetch])

    return { payload, loading, error}
}