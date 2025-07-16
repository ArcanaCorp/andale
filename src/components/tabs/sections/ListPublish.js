import banner from '../../../assets/img/banner_trip.png'
import Publish from './cards/Publish'
export default function ListPublish () {

    return (

        <section className="__section __section_publish">
            <ul className={`__list_publish`}>
                <Publish banner={banner} />
            </ul>
        </section>

    )

}