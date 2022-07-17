import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./App.css";


const App = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get('http://127.0.0.1:8000/api/quotes', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        })
            .then(function (response) {
                setLoading(false);
                return response.data;
            })
            .then(quotes => setQuotes(quotes), errors => setErrors(errors));
    }, []);

    const navigate = useNavigate();

    if(!sessionStorage.getItem('access-token')) {
        return navigate("/login");
    }

    return <div>
        {loading && <div>Fetching Quotes...</div>}
        {errors && JSON.stringify(errors)}
        {quotes && quotes.length > 0 && (
            <div>
                {
                    quotes.map((quote, index) => { return<div key={index}>
                        <img alt="" key={index} src={quote.image}/>
                        {quote.quote}</div> })
                }
            </div>
        )}
    </div>

}

export default App;
