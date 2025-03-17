export function getUserInfo() {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
        headers: {
          authorization: '1208a5bc-6444-426d-b821-a061b16240e2'
        }
      })
      .then(res => res.json())
}

export function getCards() {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
        headers: {
          authorization: '1208a5bc-6444-426d-b821-a061b16240e2'
        }
      })
      .then(res => res.json());
}

export function editProfile(name, about) {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
    method: 'PATCH',
      headers: {
        authorization: '1208a5bc-6444-426d-b821-a061b16240e2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'about': about
      })
    })
}


export function newCard(cardData) {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
    method: 'POST',
      headers: {
        authorization: '1208a5bc-6444-426d-b821-a061b16240e2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': cardData.name,
        'link': cardData.link
      })
    })
}

export function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
          authorization: '1208a5bc-6444-426d-b821-a061b16240e2'
      }
  })
  .then(res => {
      if (!res.ok) {
          return res.json().then(err => Promise.reject(err));
      }
      return res.json();
  });
}
