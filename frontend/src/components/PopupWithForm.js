import usePopupClose from "../hooks/usePopupClose.js"

function PopupWithForm({ isOpen, onClose, name, title, onSubmit, children, isLoading, submitTitle, titleName}) {

    usePopupClose(isOpen, onClose)

    return (
        <div className={isOpen ? `popup popup-${name} popup_opened` : `popup popup-${name}`}>
            <div className={`popup__container popup-${name}__container`}>
                <button type="button" className="popup__close popup-edit__close" onClick={() => onClose()}></button>
                <h2 className={`popup__title popup${titleName}__title`}>{title}</h2>
                <form className={`popup__form popup-${name}__form`} onSubmit={onSubmit}>
                    <fieldset className="popup__item"
                    >
                        {children}
                        <button type="submit" className={`popup__submit popup-${name}__submit`}>{isLoading ? "Сохранение" : submitTitle}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm