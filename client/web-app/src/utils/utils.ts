export function debounce(delay: number, callback: () => void): () => void {
    let timer: number

    return () => {
        clearTimeout(timer)
        timer = setTimeout(callback, delay)
    }
}