import { createContext, useContext, useState } from "react"

const FilterContext = createContext();
export const FilterProvider = ({ children }) => {

    const [ filter, setFilter ] = useState('all');
    const [ filterLocation, setFilterLocation ] = useState('')

    const handleChangeFilter = (value) => setFilter(value);
    const handleChangeFilterLocation = (value) => setFilterLocation(value);

    const contextValue = {
        filter,
        filterLocation,
        handleChangeFilter,
        handleChangeFilterLocation
    }

    return (
        <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
    )

}

export const useFilter = () => useContext(FilterContext);