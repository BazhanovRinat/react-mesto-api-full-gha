import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from "../contexts/CurrentUserContext.js"
import { api } from "../utils/Api.js"

import Header from './Header.js';
import Main from "./Main.js";
import Footer from "./Footer.js"
import ImagePopup from "./ImagePopup.js"
import Login from "./Login.js"
import Register from "./Register.js"
import ProtectedRouteElement from "./ProtectedRoute.js"
import * as auth from "../utils/Auth.js"

import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from "./AddPlacePopup.js"
import DeleteCardPopup from "./DeleteCardPopup.js"
import InfoTooltip from "./InfoTooltip.js"

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [deletedCard, setDeletedCard] = useState({})
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupInfoTooltipOpen, setisPopupInfoTooltipOpen] = useState(false)
  const [isPopupCorret, SetisPopupCorret] = useState(false)
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
    api.profileDataInstall()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((error) => {
        console.log(`${error}`);
      })

    // api.getInitialCards()
    //   .then((data) => {
    //     setCards(data)
    //   })
    //   .catch((error) => {
    //     console.log(`${error}`);
    //   })
    }
    tokenCheck();
  }, [loggedIn])

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true })
            setEmail(res.data.email)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)

  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)

  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)

  }

  function handleDeleteCardClick(card) {
    setDeletedCard(card)
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setisPopupInfoTooltipOpen(false)
    setSelectedCard(null)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }

  function handleCardDelete(deletedCard) {
    api.deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) => state.filter((newArr) => newArr !== deletedCard))
        closeAllPopups()
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(!isLoading)
    api.setProfileInfo(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(`${error}`);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(!isLoading)
    api.setProfileAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(`${error}`);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(!isLoading)
    api.postCard(data)
      .then((data) => {
        setIsLoading(!isLoading)
        setCards([data, ...cards]);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(`${error}`);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleLogin(values, setValues) {
    if (!values.email || !values.password) {
      return;
    }
    auth.authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          SetisPopupCorret(true)
          setValues({ email: '', password: '' });
          setLoggedIn(true)
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(err)
        setisPopupInfoTooltipOpen(true)
        SetisPopupCorret(false)
      })
  }

  function handleRegister(values, setValues) {
    auth.register(values.email, values.password)
      .then((res) => {
        if (res) {
          navigate('/sign-in', { replace: true })
          setisPopupInfoTooltipOpen(true)
          SetisPopupCorret(true)
        }
      })
      .catch(err => {
        console.log(err)
        setisPopupInfoTooltipOpen(true)
        SetisPopupCorret(false)
      })
  }

  return (

    < div className="app" >
      <CurrentUserContext.Provider value={currentUser}>
        <Header signOut={signOut} email={email} loggedIn={loggedIn} />
        <Routes>
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />

          <Route path="*" element={<ProtectedRouteElement element={Main} loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            onCardDelete={handleDeleteCardClick} />}
          />
        </Routes>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} card={deletedCard} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isOpen} />
        <InfoTooltip isOpen={isPopupInfoTooltipOpen} onClose={closeAllPopups} isPopupCorret={isPopupCorret} />

      </CurrentUserContext.Provider>

    </div >
  )
}

//console.log(api)

export default App;
