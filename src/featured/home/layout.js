import Header from "./layout/header";
import Tabs from "./layout/tabs";
import Main from "./layout/main";
import "@/config/maps.config";

export default function AppLayout () {

    return (

        <>
            <Header/>
            <Main/>
            <Tabs/>
        </>

    )

}