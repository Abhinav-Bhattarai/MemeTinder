import React, { Fragment, useEffect } from 'react';

const HomeContainer = ({ jsx, LeftClick, RightClick, CenterClick, post_list, current_sidebar_value, current_index }) => {

    // Event Listeners;

    const KeyPressed = (e)=>{
        if(post_list && current_sidebar_value === 0){
            const key_pressed = e.key;
            if(post_list.length >= 1 && current_index <= post_list.length - 1){
                if(key_pressed === ' '){
                    LeftClick();
                }
                else if(key_pressed === 'ArrowLeft'){
                    LeftClick();
                }

                else if(key_pressed === 'ArrowRight'){
                    CenterClick();
                }

                else if(key_pressed === 'ArrowUp'){
                    RightClick();
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
