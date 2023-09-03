import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm.js"

function EditAvatarPopup({isOpen, onClose, isLoading, onUpdateUser}) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" submitTitle={"Сохранить"} isOpen={isOpen} onClose={onClose} 
        onSubmit={handleSubmit} isLoading={isLoading}
        >
            <input id="popup-avatar__input" className="popup__input popup__input_new-avatar" name="avatar" ref={avatarRef}
                type="url" placeholder="Название" required />
            <span className="popup-avatar__input-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup