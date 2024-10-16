import React, { useEffect, useState } from "react"
import DEFAULT_STATE_DATA from "../../constants";
import { HeaderBar } from "../header";
import { IntroPage } from "../introPage";
import { HeaderPopup } from "../header_popup";

export const UIDisplayAdapter = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleUI = () => {
        if (windowWidth > DEFAULT_STATE_DATA.VARIABLES.MAX_MOBILE_SCREEN_WIDTH) {
            return (
                <div>
                    <HeaderPopup />
                    <div style={{width: '60%', margin: '0 auto'}}>
                        <HeaderBar />
                        <IntroPage />
                    </div>
                </div>
            )
        } else {
            return (
                <p>{`${windowWidth + ' Mobile UI'}`}</p>
            )
        }
    }

    return (
        <div>
            {handleUI()}
        </div>
    )
}