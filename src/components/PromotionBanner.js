import { usePWAStatus } from "@/hooks/usePWAStatus";
import PWAStatus from './PWAStatus'

import './styles/promotionbanner.css'
export default  function PromotionBanner () {

    const { isInstalled, hasUpdate  } = usePWAStatus();

    const shouldShowBanner = !isInstalled || hasUpdate;

    return (

        <ul className='__promotions_banner'>
            {shouldShowBanner && (
                <li className='__promotion_banner'>
                    <PWAStatus/>
                </li>
            )}
        </ul>

    )

}