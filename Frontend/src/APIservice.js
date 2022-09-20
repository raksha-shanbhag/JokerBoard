let API_URL = 'http://127.0.0.1:5000'
let Headers = {
    'Access-Control-Allow-Origin' : 'http://localhost:3000',
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Credentials': 'true'
}

export default class APIService {
    static async updateNote(id, body){
        const resp = await fetch(`${API_URL}/update/${id}/`, {
            'method': 'PUT',
            headers: Headers,
            body: JSON.stringify(body)
        })
        return await resp.json()
    }

    static async insertNote(body){
        const resp = await fetch(`${API_URL}/add`, {
            'method': 'POST',
            headers: Headers,
            body: JSON.stringify(body)
        })
        return await resp.json()
    }
    
    static async getAllNotes(){
        const resp = await fetch(`${API_URL}/get`, {
            'method': 'GET',
            headers: Headers
        })
        return await resp.json()
    }

    static async deleteNote(id){
        const resp = await fetch(`${API_URL}/delete/${id}/`, {
            'method': 'DELETE',
            headers: Headers
        })
        return await resp.json()
    }

}