import PopupWithForm from "./PopupWithForm.js"

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, card }) {

    function handleSubmit(e) {
        e.preventDefault()
        onDeleteCard(card)
    }

    return (
        <PopupWithForm name="delete" title="Вы уверены?" submitTitle={"Да"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} titleName="-delete"/>
    )
}

export default DeleteCardPopup