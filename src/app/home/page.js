import { useEffect, useState } from "react"
import { getSummaryHome } from "../../services/home.service";
import HomeSkeleton from "../../components/Skeleton/home.skeleton";
import { Link } from "react-router-dom";
import Component from "../../components/Card/Component";
import PublishBanner from "../../components/Banners/PublishBanner";

export default function HomePage() {

    const [ summary, setSummary ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getSummaryHome();
                setSummary(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchSummary();
    }, [])
    
    if (loading) return <HomeSkeleton/>

    if (error) return <div>{error}</div>;

    return (

        <>

            <PublishBanner/>
        
            {summary.map((sm, i) => (
                <div key={i} className="w-full mb-md">
                    <div className="flex mb-md px-md align-center justify-between">
                        <h2 className="text-md" aria-label={sm.title}>{sm.title}</h2>
                        <Link to={sm.link} className="text-xs" aria-label="Ver todo">Ver todo</Link>
                    </div>
                    <ul className="flex gap-xs overflow-x scroll-hidden pl pr" style={{"--pl": "var(--spacing-md)", "--pr": "var(--spacing-md)"}}>
                        {sm.list.map((lst) => (
                            <Component key={lst.id} data={lst} />
                        ))}
                    </ul>
                </div>
            ))}
        
        </>

    )

}