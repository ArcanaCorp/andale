import { Link } from "react-router-dom"
import { usePermissions } from "../context/PermissionsContext";
import { Icon } from "../helpers/icons";
import SearchBar from "../components/Search/SearchBar";

export default function Header () {

    const { locationAddress, locationPermission, requestLocationPermission, loadingLocation, locationRegion } = usePermissions();

    console.log(locationRegion);

    return (

        <header className="w-full bg-primary rounded-bottom-lg">
            <div className="w h m-auto flex align-center justify-between" style={{"--w": "90%", "--h": "60px"}}>
                <button className="h flex align-center text-xs px-xs bg-none text-white gap-2xs" style={{"--h": "40px"}} onClick={requestLocationPermission}>
                    {loadingLocation ? (
                        <>Cargando...</>
                    ) : (
                        <>
                            {locationPermission === 'denied' ? 'Permiso denegado' : locationAddress || 'Ubicación no disponible'}
                            <Icon name={'chevronDown'} size={18}/>
                        </>
                    )}
                </button>
                <Link to={'/notifications'} className="w h grid center text-white" style={{"--w": "40px", "--h": "40px"}}>{<Icon name={'bell'} />}</Link>
            </div>
            <div className="w h m-auto flex align-center" style={{"--w": "90%", "--h": "60px"}}>
                <SearchBar placeholder={'Buscar lugares, comidas, agencias y mucho más'} type={'primary'} />
            </div>
        </header>

    )

}