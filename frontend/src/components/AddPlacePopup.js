import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm"
import useForm from "../hooks/useForm.js"

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

    const { values, handleChange, setValues } = useForm({});

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: values.name,
            link: values.link
        });
    }

    return (
        <PopupWithForm name="add" title="Новое место" submitTitle={"Сохранить"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
        isLoading={isLoading}
        >
            <input id="place-name-input" className="popup__input popup__input_name_place-name" name="name"
                type="text" placeholder="Название" required minLength="2" maxLength="30" onChange={handleChange} value={values.name || ""}/>
            <span className="place-name-input-error popup__input-error"></span>
            <input id="link-input" className="popup__input popup__input_name_link" name="link" type="url"
                placeholder="Ссылка на картику" required onChange={handleChange} value={values.link || ""}/>
            <span className="link-input-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup