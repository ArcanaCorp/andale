import { Link } from "react-router-dom";
import { Icon } from "../../helpers/icons";
import { useMemo, useRef, useState } from "react";
import { searchItems, trackSearchClick } from "../../services/search.service";
import { debounce } from "../../helpers/search.helper";
import Images from "../../components/Images/Image";

export default function SearchPage () {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const cacheRef = useRef({});

    const debouncedSearch = useMemo(
        () => debounce(async (value) => {
            if (!value || value.trim().length < 2) {
                setResults([]);
                return;
            }

            // 🔁 Cache hit
            if (cacheRef.current[value]) {
                setResults(cacheRef.current[value]);
                return;
            }

            setLoading(true);

            const data = await searchItems(value);

            cacheRef.current[value] = data; // 💾 guardar cache
            setResults(data);
            setLoading(false);
        }, 300),
        []
    );

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    console.log(results);

    return (
        <>
        
            <header className="w-full h" style={{"--h": "60px"}}>
                <div className="w h m-auto flex gap-xs align-center" style={{"--w": "90%"}}>
                    <Link to={'/'} className="grid w h center" style={{"--w": "40px", "--h": "40px", "--mnw": "40px"}}><Icon name={'chevronLeft'} color="#888888" /></Link>
                    <div className="relative w-full h" style={{"--h": "40px"}}>
                        <input type="text" className="w-full h-full bg-secondary rounded-pill pr pl" autoComplete="off" style={{"--pr": "35px", "--pl": "1rem"}} name="search" id="search" placeholder="Buscar comida, cuartos, lugares y mucho más" aria-placeholder="Buscar comida, cuartos, lugares y mucho más" value={query} onChange={handleSearch} />
                        <button className="absolute w h top right bg-none grid center" style={{"--w": "30px", "--h": "30px", "--top": "5px", "--right": "5px"}}><Icon name={'search'} size={20}/></button>
                    </div>
                </div>
            </header>

            <main className="w-full h py-md overflow-y scroll-hidden" style={{"--h": "calc(100dvh - 60px)"}}>
                {results.length < 0 ? (
                    <p>No hay resultados para {query}</p>
                ) : (
                    <ul className="w m-auto flex flex-col gap-md" style={{"--w": "90%"}}>
                        {results.map((rpta) => (
                            <Link to={`/${rpta.sub}`} key={rpta.id} onClick={() => trackSearchClick(rpta, query)}>
                                <li className="w-full flex gap-xs">
                                    <div className="w h bg-secondary rounded-md" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}>
                                        <Images img={rpta.image} alt={`${rpta.name}`} />
                                    </div>
                                    <div>
                                        <h4 className="text-dark text-sm">{rpta.name}</h4>
                                        <p className="text-xs text-gray">{rpta.category}</p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
                
            </main>

        </>
    )
    
}