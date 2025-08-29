import { tabs } from '../../config/tabs'
import { useTab } from './hooks/useTab'

import Header from './header';
import Home from '../home/page';
import Promo from '../promo/page';

import Favorite from '../favorite/page';
import Orders from '../orders/page';
import Profile from '../profile/page';

import './styles/tab.css'
import Install from '../components/Install';
export default function TabLayout () {

    const { tab, handleChangeTab } = useTab();
    
    return (

        <div className='__wdn_tabs'>

            <div className='__wdn'>
                <Header/>
                <main className={`__wdn_main ${tab === 'profile' ? '__wdn_main_p' : ''}`}>
                    <Install/>
                    {tab === 'home' && ( <Home/> )}
                    {tab === 'promotions' && ( <Promo/> )}
                    {tab === 'favorite' && ( <Favorite/> )}
                    {tab === 'orders' && ( <Orders/> )}
                    {tab === 'profile' && ( <Profile/> )}
                </main>
            </div>

            <nav className='__tabs'>
                <ul className='__tabs_grouped'>
                    {tabs.map((tb, i) => (
                        <li key={i} className={`__tab ${tb.key === tab ? '__tab--active' : ''}`} onClick={() => handleChangeTab(tb.key)}>
                            <div className='__tab_ico'>{tb.ico}</div>
                            <p className='__tab_txt'>{tb.name}</p>
                        </li>
                    ))}
                </ul>
            </nav>

        </div>

    )

}