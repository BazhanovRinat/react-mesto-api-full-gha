import { api } from "../utils/Api.js"
import Card from "../components/Card.js"
import React, { useState, useEffect } from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js"
import avatarImage from "../images/avatar.png"

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {

    const profileData =  React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__user">
                    <img className="profile__avatar" src={profileData.avatar || avatarImage} alt="Ваш Аватар"/>
                    <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                    <div className="profile__info">
                        <h1 className="profile__name">{profileData.name}</h1>
                        <button type="button" className="profile__button profile__edit-button" onClick={onEditProfile}></button>
                        <p className="profile__about">{profileData.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__button profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                ))}
            </section>
        </main>
    )
}

export default Main