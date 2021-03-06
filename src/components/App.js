import React from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import apiAuth from "../utils/apiAuth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isDeletePlacePopupOpen: false,
      isInfoTooltipPopupOpen: false,
      infoTooltipMessage: "",
      infoTooltipIcon: "",
      selectedCard: null,
      currentUser: {
        name: "",
        about: "",
        avatar: "",
        _id: "",
        email: "",
      },
      cards: [],
      isLoading: {
        editProfileData: false,
        editAvatar: false,
        addPlace: false,
      },
      loggedIn: false,
      loginForAuth: "",
      passForAuth: "",
    };
  }

  onSignUp = (email, password) => {
    return apiAuth
      .signUp(email, password)
      .then((res) => {
        this.setState({
          isInfoTooltipPopupOpen: true,
          infoTooltipMessage: "Вы успешно зарегистрировались!",
          infoTooltipIcon: "success",
          loginForAuth: email,
          passForAuth: password,
        });
      })
      .catch((err) => {
        this.setState({
          isInfoTooltipPopupOpen: true,
          infoTooltipMessage: "Что-то пошло не так! Попробуйте еще раз",
          infoTooltipIcon: "error",
        });
      });
  };

  onSignIn = (email, password) => {
    return apiAuth
      .signIn(email, password)
      .then((res) => {
        this.tokenCheck();
      })
      .catch((err) => {
        this.setState({
          isInfoTooltipPopupOpen: true,
          infoTooltipMessage: "Неверный логин или пароль",
          infoTooltipIcon: "error",
        });
      });
  };

  onLogout = () => {
    this.setState({
      loggedIn: false,
      currentUser: {
        email: "",
        _id: "",
        name: "",
        about: "",
        avatar: "",
      },
    });
    localStorage.removeItem("jwt");
  };

  tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      apiAuth
        .autoSign(jwt)
        .then((data) => {
          this.setState(
            {
              loggedIn: true,
              currentUser: data,
            },
            () => {
              this.props.history.push("/");
            },
            api
              .getInitialCards()
              .then(({ data }) => {
                this.setState({
                  cards: data,
                });
              })
              .catch((err) => console.error(err))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true,
    });
  };

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true,
    });
  };

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true,
    });
  };

  handleDeletePlaceClick = () => {
    this.setState({
      isDeletePlacePopupOpen: true,
    });
  };

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card,
    });
  };

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isDeletePlacePopupOpen: false,
      selectedCard: null,
      isInfoTooltipPopupOpen: false,
    });
  };

  setIsLoadingState = (popup) => {
    this.setState({
      isLoading: {
        ...this.state.isLoading,
        [popup]: !this.state.isLoading[popup],
      },
    });
  };

  handleUpdateUser = (name, description) => {
    this.setIsLoadingState("editProfileData");
    api
      .setUserInfo(name, description)
      .then((info) =>
        this.setState({
          currentUser: {
            ...this.state.currentUser,
            name: info.name,
            about: info.about,
          },
        })
      )
      .catch((err) => console.error(err))
      .finally(() => this.setIsLoadingState("editProfileData"));
  };

  handleUpdateAvatar = (avatar) => {
    this.setIsLoadingState("editAvatar");
    api
      .setUserAvatar(avatar)
      .then((info) =>
        this.setState({
          currentUser: {
            ...this.state.currentUser,
            avatar: info.avatar,
          },
        })
      )
      .catch((err) => console.error(err))
      .finally(() => {
        this.setIsLoadingState("editAvatar");
      });
  };

  changeCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === this.state.currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = this.state.cards.map((c) =>
          c._id === card._id ? newCard : c
        );
        this.setState({
          cards: newCards,
        });
      })
      .catch((err) => console.error(err));
  };

  handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then((res) => {
        const newCards = this.state.cards.filter((c) => c._id !== cardId);
        this.setState({
          cards: newCards,
        });
      })
      .catch((err) => console.error(err));
  };

  handleAddPlaceSubmit = (name, link) => {
    this.setIsLoadingState("addPlace");
    api
      .addCard(name, link)
      .then((newCard) => {
        this.setState({
          cards: [...this.state.cards, newCard],
        });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        this.setIsLoadingState("addPlace");
      });
  };

  componentDidMount() {
    this.tokenCheck();

    api
      .getUserInfo()
      .then((info) => {
        this.setState({
          currentUser: {
            name: info.name,
            about: info.about,
            avatar: info.avatar,
            _id: info._id,
            email: info.email,
          },
        });
      })
      .catch((err) => console.error(err));
    api
      .getInitialCards()
      .then(({ data }) => {
        this.setState({
          cards: data,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="app">
          <Header
            email={this.state.currentUser.email}
            onLogout={this.onLogout}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={this.state.loggedIn}
              component={Main}
              cards={this.state.cards}
              onCardLike={this.changeCardLike}
              onCardDelete={this.handleCardDelete}
              onEditAvatar={this.handleEditAvatarClick}
              onEditProfile={this.handleEditProfileClick}
              onAddPlace={this.handleAddPlaceClick}
              onCardClick={this.handleCardClick}
              onDeletePlace={this.handleDeletePlaceClick}
            />
            <Route path="/sign-in">
              <SignIn
                onSignIn={this.onSignIn}
                loginForAuth={this.state.loginForAuth}
                passForAuth={this.state.passForAuth}
              />
            </Route>
            <Route path="/sign-up">
              <SignUp onSignUp={this.onSignUp} />
            </Route>

            <Route>
              {this.state.loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
          </Switch>
          <Footer />
          <section className="popups">
            <EditProfilePopup
              isLoading={this.state.isLoading.editProfileData}
              isOpen={this.state.isEditProfilePopupOpen}
              onClose={this.closeAllPopups}
              onUpdateUser={(name, description) =>
                this.handleUpdateUser(name, description)
              }
            />

            <EditAvatarPopup
              isLoading={this.state.isLoading.editAvatar}
              isOpen={this.state.isEditAvatarPopupOpen}
              onClose={this.closeAllPopups}
              onUpdateAvatar={({ avatar }) => this.handleUpdateAvatar(avatar)}
            />

            <AddPlacePopup
              isLoading={this.state.isLoading.addPlace}
              isOpen={this.state.isAddPlacePopupOpen}
              onClose={this.closeAllPopups}
              onAddPlace={this.handleAddPlaceSubmit}
            />

            <PopupWithForm
              isOpen={this.state.isDeletePlacePopupOpen}
              title="Вы уверены?"
              name="delete-place"
              onClose={this.closeAllPopups}
              buttonText="Да"
            />

            <ImagePopup
              card={this.state.selectedCard}
              onClose={this.closeAllPopups}
            />

            <InfoTooltip
              isOpen={this.state.isInfoTooltipPopupOpen}
              message={this.state.infoTooltipMessage}
              icon={this.state.infoTooltipIcon}
              name="info-tooltip"
              onClose={this.closeAllPopups}
            />
          </section>
        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default withRouter(App);
