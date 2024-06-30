export const headerContentWithOutAuthorization = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
}

export const customHeaders = token => {
    let copiedHeaderContentWithAuthorization = {
        ...headerContentWithOutAuthorization
    }
    copiedHeaderContentWithAuthorization['Authorization'] = `Bearer ${token}`
    return { headers: copiedHeaderContentWithAuthorization }
}