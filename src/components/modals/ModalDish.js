import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useUI } from "@/context/UIContext";
import { getInfoDish } from "@/services/foods.services";

import DishDetails from "@/app/tabs/screens/foods/details/dish";

import './styles/modal.css'

export default function ModalDish ({ company }) {

    const { modal, handleChangeModal } = useUI();
    const [ info, setInfo ] = useState(null)
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getDishInfo = async () => {
            try {
                const data = await getInfoDish(modal?.bussines, modal?.id);
                if (!data.ok) return console.warn(data.message);
                    setInfo(data?.dish)
            } catch (error) {
                console.error(error);
                setInfo(null)
            } finally {
                setLoading(false)
            }
        }
        getDishInfo();
    }, [modal])

    return (

        <div className="__overlay">

            <div className="__modal __modal_dish">

                <div className="__modal_head">
                    <button className="__btn_close" onClick={() => handleChangeModal('', '', '')}><IconX/></button>
                </div>

                {loading ? (
                    <div className="__modal_load">
                        <span className="__loader"></span>
                    </div>
                ) : (
                    <DishDetails info={info} />
                )}

            </div>

        </div>

    )

}