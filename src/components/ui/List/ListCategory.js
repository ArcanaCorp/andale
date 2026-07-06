import ChipSkeleton from "../Chips/ChipSkeleton"

export default function ListCategory ({ list, load, active, onSelected }) {

    if (load) return <div className="w-full flex gap-sm scroll-x px-md">{Array.from({length: 5}).map((_, i) => ( <ChipSkeleton key={i}/> ))}</div>

    return (
        <ul className="w-full flex items-center gap-sm scroll-x px-md">
            <button className={`text-xs rounded-full text-nowrap py-sm px-md ${active === null ? "bg-dark text-white" : "bg-surface"}`} onClick={() => onSelected(null)}>Todos</button>
            {list.length > 0 ? (
                list.map((category) => (
                    <button key={category.id} className={`text-xs rounded-full text-nowrap py-sm px-md ${active === category.id ? "bg-dark text-white" : "bg-surface"}`} onClick={() => onSelected(category.id)}>{category.name}</button>
                ))
            ) : (
                <p className="text-muted">No hay categorias</p>
            )}
        </ul>
    )
}