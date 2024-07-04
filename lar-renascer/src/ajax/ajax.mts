export interface apiResponse {
    status: "error" | "success";
    message: string;
    data?: any;
    user?: any;
    msg?: any;
    benfeitor?: any;
    transacoes?: any;
}

const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}


export async function ajax(endpoint: string, method: string, data?: any): Promise<apiResponse> {
    const endpointFormatted = `http://localhost:3001/api/v1` + endpoint;
    
    const requestOptions: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
        },
        credentials: "include",
        body: data ? JSON.stringify(data) : undefined,
    };

    try {
        const response = await fetch(endpointFormatted, requestOptions);
        const responseData = await response.json();
        if (response.ok) {
            return responseData;
        } else {
            console.error('Ocorreu um erro na requisição.');
            console.log(responseData);
            if (responseData.msg == "Unauthorized") {

                deleteAllCookies();
                localStorage.clear();
                sessionStorage.clear();
                
                return window.location.href = '/login';
            }
            
            return ({status: "error", message: "Erro inesperado"});
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        return ({status: "error", message: "Erro interno do servidor"});
    }
}

