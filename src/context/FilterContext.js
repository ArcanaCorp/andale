import { createContext, useContext, useState } from "react"

const FilterContext = createContext();
export const FilterProvider = ({ children }) => {

    const [ filter, setFilter ] = useState('all');

    const handleChangeFilter = (value) => setFilter(value);

    const contextValue = {
        filter,
        handleChangeFilter
    }

    return (
        <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
    )

}

export const useFilter = () => useContext(FilterContext);