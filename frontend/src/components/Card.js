import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__button ${isLiked && 'element__button_active'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick () {
        onCardDelete(card)
    }

    return (
        <div className="element">
            {isOwn && <div className="element__delete" onClick={handleDeleteClick}
                style=
                {{
                    backgroundImage: `url(${"<%=require('./images/trash.svg')%>"})`,
                }} />}
            <img className="element__image" onClick={handleClick}
                style=
                {{
                    backgroundImage: `url(${card.link})`,
                    backgroundSize: "cover",
                }} />
            <div className="element__item">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-area">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card