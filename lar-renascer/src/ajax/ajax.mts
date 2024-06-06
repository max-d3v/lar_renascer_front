<<<<<<< HEAD:lar-renascer/src/ajax/ajax.ts
export async function ajax(endpoint: string, method: string, data?: any): Promise<any> {
=======
export interface apiResponse {
    status: "error" | "success";
    message: string;
}

export async function ajax(endpoint: string, method: string, data?: any): Promise<apiResponse> {
    const endpointFormatted = `http://localhost:3001/api/v1` + endpoint;
    
>>>>>>> d41b2c73381d953c2c8b688ade8b8bdad0c68283:lar-renascer/src/ajax/ajax.mts
    const requestOptions: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : undefined
    };

    try {
<<<<<<< HEAD:lar-renascer/src/ajax/ajax.ts
        const response = await fetch(`http://localhost:3001/api/v1${endpoint}`, requestOptions);
=======
        const response = await fetch(endpointFormatted, requestOptions);
>>>>>>> d41b2c73381d953c2c8b688ade8b8bdad0c68283:lar-renascer/src/ajax/ajax.mts
        if (response.ok) {
            const responseData = await response.json();
            return responseData; // Aqui você pode manipular a resposta
        } else {
            console.error('Ocorreu um erro na requisição.');
            return ({status: "error", message: "Erro inesperado"});
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
<<<<<<< HEAD:lar-renascer/src/ajax/ajax.ts
        return false;
=======
        return ({status: "error", message: "Erro interno do servidor"});
>>>>>>> d41b2c73381d953c2c8b688ade8b8bdad0c68283:lar-renascer/src/ajax/ajax.mts
    }
}

