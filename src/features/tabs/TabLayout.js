import { tabs } from '../../config/tabs'
import { useTab } from './hooks/useTab'

import Header from './header';
import Home from '../home/page';

import './styles/tab.css'
export default function TabLayout () {

    const { tab, handleChangeTab } = useTab();

    return (

        <div className='__wdn_tabs'>

            <div className='__wdn'>
                <Header/>
                <main style={{overflowX: 'hidden'}}>
                    {tab === 'home' && ( <Home/> )}
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