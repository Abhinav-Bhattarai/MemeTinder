import React, { Fragment } from 'react';

const HomeContainer = ({ jsx, LeftClick, RightClick, CenterClick }) => {

    // Event Listeners;

    const KeyPressed = (e)=>{
        if(post_list && current_sidebar_value === 0){
            const key_pressed = e.key;
            if(post_list.length >= 1 && current_index <= post_list.length - 1){
                if(key_pressed === ' '){
                    LeftClickHandler();
                }
                else if(key_pressed === 'ArrowLeft'){
                    LeftClickHandler();
                }

                else if(key_pressed === 'ArrowRight'){
                    CenterClickHandler();
                }

                else if(key_pressed === 'ArrowUp'){
                    RightClickHandler();
                }
            }
        }
    }

    useEffect(() => {

        document.addEventListener("keydown", KeyPressed);
        return () => document.removeEventListener("keydown", KeyPressed);
    
    });

    return (
        <Fragment>
            { jsx }
        </Fragment>
    )
}

export default HomeContainer;
