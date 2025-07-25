import { createContext, useCallback, useContext, useState } from 'react';

const BussinesProfileContext = createContext();

export function BussinesProfileProvider({ children }) {
    
    const [profile, setProfile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('all');

    // ✅ aquí haces la función estable
    const savedInfoProfile = useCallback((bussines, categories, products) => {
        setProfile(bussines);
        setCategories(categories);
        setProducts(products);
    }, []);

    const handleChangeFilter = useCallback((f) => setFilter(f), []);

    const contextValue = {
        profile,
        categories,
        products,
        filter,
        savedInfoProfile,
        handleChangeFilter
    }

    return (
        <BussinesProfileContext.Provider value={contextValue}>{children}</BussinesProfileContext.Provider>
    );
}

export const useProfile = () => useContext(BussinesProfileContext)