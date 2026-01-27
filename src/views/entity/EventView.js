import { useEffect } from "react";
import confetti from "@hiseb/confetti";
import Images from "@/components/Images/Image";
import { formatDateToDayMonth, formattedDate } from "../../helpers/date-formatter";
import SEO from "../../components/SEO";

export default function EventView ({ entity }) {

    useEffect(() => {
        confetti({
            particleCount: 350,
            spread: 70,
            origin: { y: 0.6 },
        });
    }, []);

    const activitiesByDate = Object.values(
        (entity.activities || []).reduce((acc, act) => {
        const date = act.startDate;
        if (!acc[date]) acc[date] = { date, activities: [] };
        acc[date].activities.push(act);
        return acc;
        }, {})
    )
    // Ordenar cronológicamente por fecha
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return (

        <>

            <SEO
                title={entity.title}
                description={entity.description}
                keywords={entity.description}
                image={entity.hero}
                url={`https://andaleya.pe/${entity.slug}`}
            />
        
            <div className="w-full h bg-secondary" style={{"--h": "250px"}}>
                <Images img={entity.hero} />
            </div>

            <div className="relative w-full bg-white mt rounded-top-lg p-sm" style={{"--mt": "-10px"}}>

                <div className="mb-md">
                    <p className="text-xs text-gray">Evento {entity.category}</p>
                    <h1 aria-label={entity.title}>{entity.title}</h1>
                    <p className="text-xs text-gray">{formattedDate(entity.startDate, 'LL')} • {formattedDate(entity.endDate, 'LL')}</p>
                </div>

                <div className="w-full mb-md flex align-center justify-between gap-xs">
                    <button className="w-full h bg-primary text-white rounded-md text-xs flex align-center justify-center gap-xs" style={{"--h": "35px"}}>Me interesa</button>
                    <button className="w-full h bg-secondary rounded-md text-xs flex align-center justify-center gap-xs" style={{"--h": "35px"}}>Asistiré</button>
                </div>

                <div className="mb-md">
                    <h2 className="mb-xs">Acerca de</h2>
                    <p className="text-xs text-gray line-xl">{entity.description}</p>
                </div>

                <div className="mb-md">
                    <h2 className="mb-xs">Actividades</h2>
                    <ul className="flex flex-col gap-xs">
                        {activitiesByDate.map((act, idx) => {
                            const day = formatDateToDayMonth(act.date)
                            return (
                                <li key={idx} className="flex gap-xs">
                                    <div className="w h bg-badge rounded-md flex flex-col align-center justify-center" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}>
                                        <p className="fw-bold">{day.day}</p>
                                        <p className="text-xs">{day.month}</p>
                                    </div>
                                    <ul className="w-full flex gap-xs flex-col">
                                        {act.activities.map((actt) => (
                                            <li key={actt.id} className="w-full bg-badge p-xs rounded-md">
                                                <p className="text-xs text-gray">{actt.title}</p>
                                                <h3>{actt.venue}</h3>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            
            </div>

        </>
    
    )

}