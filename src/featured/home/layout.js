import Header from "./layout/header";
import Tabs from "./layout/tabs";
import Main from "./layout/main";
import "@/config/maps.config";
import { useAuth } from "../../context/AuthContext";

export default function AppLayout () {

    const { user } = useAuth();
    console.log(user);
    

    return (

        <>
            <Header/>
            <Main/>
            <Tabs/>
        </>

    )

}