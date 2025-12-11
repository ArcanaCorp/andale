import { IconChevronLeft } from '@tabler/icons-react'
import { useApp } from '@/context/AppContext'
import Notification from '../../components/Notification';

import './styles/page.css'
export default function NotificationsPage () {

    const { notifications } = useApp();

    return (

        <>
        
            <header className='__header_notifications'>
                <a href='/' className='__btn_back'><IconChevronLeft/></a>
                <h3>Notificaciones</h3>
            </header>

            <main className='__main_notifications'>
                {notifications.length === 0 ? (
                <div className='__full_main_notifications'>
                    <h3>Aún no tienes notificaciones</h3>
                </div>
                ) : (
                    <ul className='--notifications'>
                        {notifications.map((n) => (
                            <Notification key={n.id} notify={n} />
                        ))}
                    </ul>
                )}
            </main>

        </>

    )

}