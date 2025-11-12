import Images from './Images'
import banner1 from '@/shared/img/banner_1.png'

import './styles/promotionbanner.css'
export default  function PromotionBanner () {

    return (

        <ul className='__promotions_banner'>
            <li className='__promotion_banner'>
                <Images img={banner1} alt={`Promoción número uno - Ándale Ya!`} />
            </li>
            <li className='__promotion_banner'>
                <Images img={banner1} alt={`Promoción número uno - Ándale Ya!`} />
            </li>
            <li className='__promotion_banner'>
                <Images img={banner1} alt={`Promoción número uno - Ándale Ya!`} />
            </li>
        </ul>

    )

}