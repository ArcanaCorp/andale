import { formatMoney } from "@/helpers/formatted.helper";
import Avatar from "../Avatars/Avatar";
import ButtonAmount from "../Buttons/ButtonAmount";

export default function CardItemCart ({ id, product, amount }) {
    return (
        <article className="w-full flex gap-sm">
            <Avatar size={80} rounded={'rounded-md'} name={product?.name} image={product?.image_url} />
            <div className="w-full flex items-start gap-xs">
                <div className="w-full">
                    <h4 className="text-sm text-medium">{product?.name}</h4>
                    <p className="text-md text-semibold">s/. {formatMoney(product?.price)}</p>
                    <p className="text-xs text-muted">{product?.description}</p>
                </div>
                <ButtonAmount idProduct={id} size={28} amount={amount} />
            </div>
        </article>
    )
}