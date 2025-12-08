export const fetchBairrosCount = () => {
    return fetch("http://localhost:8080/bairros")
        .then(res => {
            if (!res.ok) return 0
            return res.json()
        })
        .then(data => data.length || 0)
        .catch(() => 0)
}

export const fetchClientesCount = () => {
    return fetch("http://localhost:8080/users")
        .then(res => {
            if (!res.ok) return 0
            return res.json()
        })
        .then(data => data.length || 0)
        .catch(() => 0)
}

export const fetchImoveisCount = () => {
    return fetch("http://localhost:8080/imoveis")
        .then(res => {
            if (!res.ok) return 0
            return res.json()
        })
        .then(data => data.length || 0)
        .catch(() => 0)
}

export const fetchTiposImoveisCount = () => {
    return fetch("http://localhost:8080/tipos-imoveis/tipos-page")
        .then(res => {
            if (!res.ok) return 0
            return res.json()
        })
        .then(data => {
            const result = Array.isArray(data) ? data : data.content || []
            return result.length
        })
        .catch(() => 0)
}
