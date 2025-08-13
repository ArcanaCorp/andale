import './styles/skeletoncard.css'
export default function SkeletonCard () {

    return (

        <div className='__skl_content __skl_content_product'>
            <div className='__skl_row'>
                <div className='__skl_name skeleton'></div>
                <div className='__skl_text skeleton'></div>
                <div className='__skl_price skeleton'></div>
            </div>
            <div className='__skl_photo skeleton'></div>
        </div>

    )

}