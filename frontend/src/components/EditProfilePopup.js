import PopupWithForm from "./PopupWithForm.js";
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useForm from "../hooks/useForm.js"

function EditProfilePopup({isOpen, onUpdateUser, onClose, isLoading}) {

    const { values, handleChange, setValues } = useForm({});

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setValues({ name: currentUser.name, about: currentUser.about });
    }, [isOpen, currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (
        <PopupWithForm name="edit" title="Редактировать профиль" submitTitle={"Сохранить"} isOpen={isOpen} onClose={onClose} 
        onSubmit={handleSubmit} isLoading={isLoading}
        >
            <input id="name-input" className="popup__input popup__input_name_name" name="name" type="text"
                placeholder="Имя" required minLength="2" maxLength="40" onChange={handleChange} value={values.name || ""} />
            <span className="name-input-error popup__input-error"></span>
            <input id="about-input" className="popup__input popup__input_name_about" name="about" type="text"
                placeholder="О себе" required minLength="2" maxLength="200" onChange={handleChange} value={values.about || ""} />
            <span className="about-input-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup