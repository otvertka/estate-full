import React, { useState } from 'react'
import './searchBar.scss'

const tipes = ["buy", "rent"];

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState({
        tipe: "buy",
        location: "",
        minPrice: 0,
        maxPrice: 0,
    });

    const switchType = (val) => {
        setQuery((prev) => ({ ...prev, tipe: val }))
    }

    return (
        <div className='searchBar'>
            <div className="type">
                {tipes.map((tipe) => (
                    <button key={tipe} onClick={() => switchType(tipe)}
                        className={query.tipe === tipe ? "active" : ""}>
                        {tipe}</button>))}

            </div>
            <form>
                <input type="text" name='location' placeholder='City Location' />
                <input type="number" name='minPrice' min={0} max={10000000} placeholder='Min Price' />
                <input type="number" name='maxPrice' min={0} max={10000000} placeholder='Max Price' />
                <button>
                    <img src='/public/search.png'></img>
                </button>
            </form>
        </div>
    )
}

export default SearchBar