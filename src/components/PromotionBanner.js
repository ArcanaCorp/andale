import { usePWAStatus } from "@/hooks/usePWAStatus";
import PWAStatus from './PWAStatus'

import './styles/promotionbanner.css'
export default  function PromotionBanner () {

    const { isInstalled, hasUpdate  } = usePWAStatus();

    const promotions = [];
    const shouldShowBanner = !isInstalled || hasUpdate;

    return (

        promotions.length > 0 || shouldShowBanner ? (
            <ul className='__promotions_banner'>
                {shouldShowBanner && (
                    <li className='__promotion_banner'>
                        <PWAStatus/>
                    </li>
                )}
            </ul>
        ) : (
            <></>
        )

    )

}