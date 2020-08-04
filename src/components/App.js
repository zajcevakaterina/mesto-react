import React from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isDeletePlacePopupOpen: false,
      selectedCard: null,
    }
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true
    });
  }

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true
    });
  }

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true
    });
  }

  handleDeletePlaceClick = () => {
    this.setState({
      isDeletePlacePopupOpen: true
    });
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card
    })
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isDeletePlacePopupOpen: false,
      selectedCard: null
    });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Main
          onEditAvatar={this.handleEditAvatarClick}
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onCardClick={this.handleCardClick}
          onDeletePlace={this.handleDeletePlaceClick} />
        <Footer />

        <section className="popups">
          <PopupWithForm
            isOpen={this.state.isEditProfilePopupOpen}
            title='Редактировать профиль'
            name='edit-profile'
            onClose={this.closeAllPopups}
            buttonText="Сохранить"
            children={(
              <React.Fragment>
                <label className="form__field">
                  <input type="text" name="name" id="profile-name" className="form__item form__item_el_name"
                    placeholder="Имя и фамилия" minLength="2" maxLength="40" required />
                  <span className="form__item-error" id="profile-name-error"></span>
                </label>

                <label className="form__field">
                  <input type="text" name="job" id="profile-job" placeholder="Род занятий"
                    className="form__item form__item_el_job" minLength="2" maxLength="200" required />
                  <span className="form__item-error" id="profile-job-error"></span>
                </label>
              </React.Fragment>)
            } />

          <PopupWithForm
            isOpen={this.state.isEditAvatarPopupOpen}
            title='Обновить аватар'
            name='edit-avatar'
            onClose={this.closeAllPopups}
            buttonText='Сохранить'
            children={(
              <React.Fragment>
                <label className="form__field">
                  <input type="url" name="link" id="avatar-link" placeholder="Ссылка на аватар"
                    className="form__item form__item_el_avatar-link" required />
                  <span className="form__item-error" id="avatar-link-error"></span>
                </label>
              </React.Fragment>
            )} />

          <PopupWithForm
            isOpen={this.state.isAddPlacePopupOpen}
            title='Новое место'
            name='add-place'
            onClose={this.closeAllPopups}
            buttonText='Создать'
            children={(
              <React.Fragment>
                <label className="form__field">
                  <input type="text" name="name" id="place-name" className="form__item form__item_el_place-name" minLength="1"
                    maxLength="30" placeholder="Название" required />
                  <span className="form__item-error" id="place-name-error"></span>
                </label>

                <label className="form__field">
                  <input type="url" name="link" id="place-link" placeholder="Ссылка на картинку"
                    className="form__item form__item_el_place-link" required />
                  <span className="form__item-error" id="place-link-error"></span>
                </label>
              </React.Fragment>
            )} />

          <PopupWithForm
            isOpen={this.state.isDeletePlacePopupOpen}
            title='Вы уверены?'
            name='delete-place'
            onClose={this.closeAllPopups}
            buttonText='Да'
          />

          <ImagePopup
            card={this.state.selectedCard}
            onClose={this.closeAllPopups} />

        </section>
      </div>
    );
  }
}

export default App;
