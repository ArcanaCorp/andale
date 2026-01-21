import { IconPlus } from "@tabler/icons-react";
import Images from '@/components/Images'
import { useCart } from '@/context/CartContext'
import { toast } from 'sonner';
import { REACT_APP_API } from "@/config";

export default function ProductCard ({ data, companies }) {
    
    const urlImage = data.image !== '' ? `${REACT_APP_API}/socio/${companies.sub}/bussines/products/image/${data.image}` : null;

    const { addToCart } = useCart();

    const handleAdd = () => {
        addToCart(data, companies);
        toast.success('Se agregó al carrito')
    }

    return (

        <li className="flex gap-sm justify-between">
            <div>
                <h4>{data?.name}</h4>
                <p className="text-gray text-xs">{data?.description}</p>
                <p className="text-gray text-xs">Cantidad {data?.amount}</p>
                <p>S/. {!data?.box ? (data?.price).toFixed(2) : (data?.priced).toFixed(2)}</p>
            </div>
            <div className="bg-secondary rounded-md relative overflow-hidden" style={{width: '100px', height: '100px', minWidth: '100px'}}>
                <button className="absolute grid center bg-dark rounded-full" style={{width: '30px', height: '30px', minWidth: '30px', top: '5px', right: '5px'}} onClick={handleAdd}><IconPlus color={'#FFFFFF'}/></button>
                <Images img={urlImage} alt={`${data?.name}`} />
            </div>
        </li>

    )

}