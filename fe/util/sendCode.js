import axios from 'axios'
const sendCode = async(code) => {
    const resp = await axios.post('http://localhost:8000/api/signup', {
                code
            })
    return resp.data;
}
 
export default sendCode;