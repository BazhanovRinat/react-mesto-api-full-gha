import CorrectTooltip from '../images/correctInfoTooltip.svg';
import ErrorctTooltip from '../images/errorInfoTooltip.svg';

function InfoTooltip({ isOpen, onClose, isPopupCorret }) {
    return (
        <div className={isOpen ? `popup popup-infoTooltip popup_opened` : `popup`}>
            <div className={`popup__container popup-infoTooltip__container`}>
                <button type="button" className="popup__close popup-edit__close" onClick={() => onClose()}></button>
                <img className="popup-infoTooltip__image" src={isPopupCorret ? CorrectTooltip : ErrorctTooltip} alt="" />
                <h2 className={`popup-infoTooltip__title`}>{isPopupCorret ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip