import { IconX } from "@tabler/icons-react";
import { useUI } from "@/context/UIContext";
import { useDB } from "@/context/DBContext";

export default function DishDetails ({ id, list }) {

    const { modal, handleChangeModal } = useUI();
    const { foodsList } = useDB()

    console.log(foodsList);

    return (

        <>
        
            <div className="__overlay">
                <div className="__modal __modal_dish">
                    <div className="__modal_head">
                        <button className="__btn_close" onClick={() => handleChangeModal('', '')}><IconX/></button>
                    </div>
                    <div className="__modal_body">
                        <h1>Plato {modal?.id}</h1>
                    </div>
                </div>
            </div>

        </>

    )

}