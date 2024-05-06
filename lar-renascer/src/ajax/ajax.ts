export async function ajax(endpoint: string, method: string, data?: any): Promise<any> {
    const requestOptions: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : undefined
    };

    try {
        const response = await fetch(`http://localhost:3001/api/v1${endpoint}`, requestOptions);
        if (response.ok) {
            const responseData = await response.json();
            return responseData; // Aqui você pode manipular a resposta
        } else {
            console.error('Ocorreu um erro na requisição.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

