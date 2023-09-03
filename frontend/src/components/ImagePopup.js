import usePopupClose from "../hooks/usePopupClose.js"

function ImagePopup({ card, onClose, isOpen }) {

    usePopupClose(isOpen, onClose)

    return (
        <div className={card ? "popup popup-zoom popup_opened" : "popup popup-zoom"}>
            <div className="popup-zoom__container">
                <button type="button" className="popup__close popup-zoom__close" onClick={() => onClose()}></button>
                <img className="popup-zoom__image" src={card?.link} alt={card?.name} />
                <h2 className="popup-zoom__title">{card?.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup