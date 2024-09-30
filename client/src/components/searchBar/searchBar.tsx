import React, { useState } from 'react'
import './searchBar.scss'
import { Link } from 'react-router-dom';

const transactionTypes = ["buy", "rent"];

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState({
        type: "buy",
        city: "",
        location: "",
        minPrice: 0,
        maxPrice: 0,
    });

    const switchType = (val) => {
        setQuery((prev) => ({ ...prev, type: val }))
    }

    const handleChange = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className='searchBar'>
            <div className="type">
                {transactionTypes.map((type) => (
                    <button key={type} onClick={() => switchType(type)}
                        className={query.type === type ? "active" : ""}>
                        {type}</button>))}

            </div>
            <form>
                <input type="text" name='city' placeholder='City' onChange={handleChange} />
                <input type="number" name='minPrice' min={0} max={10000000} placeholder='Min Price' onChange={handleChange} />
                <input type="number" name='maxPrice' min={0} max={10000000} placeholder='Max Price' onChange={handleChange} />

                <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
                    <button>
                        <img src='/public/search.png'></img>
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default SearchBar