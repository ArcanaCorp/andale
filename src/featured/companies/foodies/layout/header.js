import HeaderNavigate from '@/components/HeaderNavigate'
import Filters from '../components/Filters'
import './styles/header.css'

export default function HeaderFoodies () {

    return (

        <header className='__header_foodies'>
            <HeaderNavigate/>
            <div className='__row __row_B'>
                <Filters/>
            </div>
        </header>

    )

}