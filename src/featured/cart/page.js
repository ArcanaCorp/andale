import { IconChevronLeft } from '@tabler/icons-react'
import { useCart } from '@/context/CartContext'
import ProductCart from './components/ProductCart';

import './styles/page.css'
import Images from '../../components/Images';

export default function CartPage () {

    const { cart, toogleDelivery } = useCart();

    const listLink = {
        'ecommerce': 'store',
        'hotel': 'hotels',
        'restaurant': 'foodies',
        'agency': 'agency'
    }

    return (

        <>
        
            <header className='__header_cart'>
                <a href='/' className='__btn_back'><IconChevronLeft/></a>
                <h3>Carrito de compras</h3>
            </header>

            <main className={`__main_cart ${cart.productos.length === 0 ? '__main_cart_full' : '__main_cart_pay'}`}>
                {cart.productos.length === 0 ? (
                    <div className='__content_box'>
                        <h2>Carrito vacio</h2>
                        <p>No tienes productos en tu carrito.</p>
                        <a href='/' className='__btn_back_primary'>Volver al inicio</a>
                    </div>
                ) : (
                    <>

                        <div className='--box-bussines flex align-center justify-between'>
                            <div className='--col-A flex gap-xs'>
                                <div className='--avatar overflow-hidden'>
                                    <Images img={cart.negocio.photo} alt={`Foto de perfil de ${cart.negocio.name}`} />
                                </div>
                                <div className='--row'>
                                    <h3>{cart.negocio.name}</h3>
                                    <p className='text-xs text-gray'>{cart.negocio.address.direction}</p>
                                </div>
                            </div>
                            <div className='--col-B flex'>
                                <a href={`/${listLink[cart.negocio.category]}/${cart.negocio.sub}`} className='text-xs text-primary fw-semibold'>Ir al local</a>
                            </div>
                        </div>

                        <div className='--choosed-pick flex m-auto mb-lg transition'>
                            <button className={`--btn-pick text-xs ${!cart.delivery ? '--btn-pick--active' : ''}`} onClick={() => toogleDelivery(2)}>Recoger pedido</button>
                            <button className={`--btn-pick text-xs ${cart.delivery ? '--btn-pick--active' : ''}`} onClick={() => toogleDelivery(2)}>Delivery</button>
                        </div>
                    
                        <ul className='--product-cart-list flex flex-col gap-lg'>
                            {cart.productos.map((p) => (
                                <ProductCart key={p.id} product={p} sub={cart.negocio.sub} />
                            ))}
                        </ul>

                        <div className='--product-summary'>
                            <h3 className='mb-sm'>Resumen del pedido</h3>
                            <ul className='flex flex-col gap-sm'>
                                {cart.productos.map((p) => (
                                    <li key={p.id} className='flex align-center justify-between'>
                                        <span className='text-xs'>{p.name}</span>
                                        <span><sup>S/</sup>{(p?.subtotal).toFixed(2)}</span>
                                    </li>
                                ))}
                                <div className='--line'></div>
                                <li className='flex align-center justify-between'>
                                    <span className='text-xs'>Subtotal</span>
                                    <span><sup>S/</sup>{(cart.subtotal).toFixed(2)}</span>
                                </li>
                                {cart.delivery && (
                                    <li className='flex align-center justify-between'>
                                        <span className='text-xs'>Costo de envio</span>
                                        <span><sup>S/</sup>2.00</span>
                                    </li>
                                )}
                                <div className='--line'></div>
                                <li className='flex align-center justify-between'>
                                    <span className='text-xs'>Total</span>
                                    <span><sup>S/</sup>{(cart.total).toFixed(2)}</span>
                                </li>
                            </ul>
                        </div>
                    
                    </>
                )}

            </main>

            {cart.productos.length > 0 && (
                <footer className={`__footer_cart`}>
                    <button className='__btn_pay'>Realizar pedido</button>
                </footer>
            )}

        </>

    )

}