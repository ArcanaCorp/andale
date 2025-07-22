import banner from '@/assets/img/banner_food.png'
import PublishCard from '@/components/cards/PublishCard'
export default function ListPublish () {

    return (

        <section className="__section __section_publish">
            <ul className={`__list_publish`}>
                <PublishCard banner={banner} />
            </ul>
        </section>

    )

}