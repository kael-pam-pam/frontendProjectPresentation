import React, {useState, useContext} from 'react'
import { PropsPopup } from './Popup'


export {
    PopupProvider,
    usePopup,
    useSetPopup,
    useSetIsVisiblePopup,
    IsVisiblePopup
}


const defaultValue: PropsPopup = {
    items: [
        {
            caption: '<Пусто>',
            action: () => {},
        },
    ],
    pos: {
        x: 0,
        y: 0,
    },
//!    visible: false,
    width: 100,
}

const visible: boolean = false;

const PopupContext = React.createContext(defaultValue)
const SetPopupContext = React.createContext((nP: PropsPopup) => {})
const IsVisiblePopupContext = React.createContext(visible);
const SetIsVisiblePopupContext = React.createContext((nV: boolean) => {})

const usePopup = () => useContext(PopupContext)  
const IsVisiblePopup = () => useContext(IsVisiblePopupContext)


const useSetPopup = () => useContext(SetPopupContext)
const useSetIsVisiblePopup = () => useContext(SetIsVisiblePopupContext)

function PopupProvider({ children }: any) {  
    const[props, setProps] = useState(defaultValue);
    const[isVisible, setIsVisible] = useState(visible);

    function setPopup(newProps: PropsPopup) {
        return setProps(newProps)
    }
    
    function setVisible(newValue: boolean) {
        return setIsVisible(newValue)
    } 

    return (
        <PopupContext.Provider value = {props}>
            <SetPopupContext.Provider value = {setPopup}>
                <IsVisiblePopupContext.Provider value = {isVisible}>
                    <SetIsVisiblePopupContext.Provider value = {setVisible}>
                        {children}
                    </SetIsVisiblePopupContext.Provider>
                </IsVisiblePopupContext.Provider>
            </SetPopupContext.Provider>    
        </PopupContext.Provider>
    )
}