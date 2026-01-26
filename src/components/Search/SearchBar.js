import { Link } from "react-router-dom";
import { Icon } from "../../helpers/icons";

export default function SearchBar ({ placeholder, type }) {
    
    const className = {
        'primary': 'bg-white text-gray'
    }

    return (
        <>
            <Link to={`/search`} className={`relative w-full h flex align-center px-md ${className[type]} rounded-pill`} style={{"--h": "40px"}}>
                <span className="block w text-xs text-nowrap overflow-hidden" style={{"--w": "calc(100% - 8%)"}} aria-label={placeholder}>{placeholder}</span>
                <span className={`absolute w h grid center ${type === 'primary' ? 'bg-primary text-white' : ''} rounded-pill`} style={{"top": 2.5, "right": 2.5, "--w": "35px", "--h": "35px"}}><Icon name={'search'} size={18} /></span>
            </Link>
        </>
    )
}