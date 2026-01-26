import Images from "@/components/Images/Image";

export default function CardEntity ({ data }) {

    console.log(data);

    return (

        <li className="flex flex-col gap-xs pointer">
            <div className="w-full h bg-secondary rounded-md" style={{ "--h": "166px"}}>
                <Images img={data.image} alt={`${data.name}`} />
            </div>
            <div>
                <p className="text-md"><b>S/{(data.price).toFixed(2)}</b></p>
                <p className="text-xs text-gray">{data.name}</p>
            </div>
        </li>

    )

}