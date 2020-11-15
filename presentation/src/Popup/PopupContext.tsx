import React, {useState, useContext} from 'react'
import { PropsPopup } from './Popup'

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
    visible: false,
    width: 100,
}

const PopupContext = React.createContext(defaultValue)
const SetPopupContext = React.createContext((nP: PropsPopup) => {})

function usePopup() {
    return useContext(PopupContext)
}

const useSetPopup = () => useContext(SetPopupContext)

function PopupProvider({ children }: any) {  
    const[props, setProps] = useState(defaultValue);

    function setPopup(newProps: PropsPopup) {
        return setProps(newProps)
    } 

    return (
        <PopupContext.Provider value = {props}>
            <SetPopupContext.Provider value = {setPopup}>
                {children}
            </SetPopupContext.Provider>    
        </PopupContext.Provider>
    )
}

export {
    PopupProvider,
    usePopup,
    useSetPopup,
}