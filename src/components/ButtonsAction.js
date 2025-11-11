import { IconHeart, IconShare3 } from "@tabler/icons-react";

export default function ButtonsAction (liked=true, shared=true) {

    return (

        <>
            {liked && (
                <button className={`__btn_action __btn_action_liked`}><IconHeart/></button>
            )}

            {shared && (
                <button className={`__btn_action __btn_action_shared`}><IconShare3/></button>
            )}
        </>

    )

}