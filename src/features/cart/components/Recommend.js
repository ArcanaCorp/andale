import RecomendCard from "./Card";

import './styles/recommend.css'

export default function Recommend () {

    return (

        <section className="__section_recommend_cart">

            <h2 className="__ttl">¿Te tienta algo más?</h2>
            <ul className="__lst_rc">
                <RecomendCard/>
                <RecomendCard/>
                <RecomendCard/>
            </ul>
            <button className="__btn_search">Buscar más productos</button>

        </section>

    )

}