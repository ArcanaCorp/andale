import { IconChevronLeft } from '@tabler/icons-react'
import './styles/page.css'
export default function NotificationsPage () {

    return (

        <>
        
            <header className='__header_notifications'>
                <a href='/' className='__btn_back'><IconChevronLeft/></a>
                <h3>Notificaciones</h3>
            </header>

            <main className='__main_notifications'>
                <div className='__full_main_notifications'>
                    <h3>Aún no tienes notificaciones</h3>
                </div>
            </main>

        </>

    )

}