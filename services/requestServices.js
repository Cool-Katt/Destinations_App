const request = async (method, url, body) => {
    let options = {
        method,
    };

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({...body, returnSecureToken: true})
        });
    }

    let response = await fetch(url, options);
    return await response.json();
}

export default {
    get: request.bind(this, 'GET'),
    post: request.bind(this, 'POST'),
    put: request.bind(this, 'PUT'),
    patch: request.bind(this, 'PATCH'),
    delete: request.bind(this, 'DELETE'),
}