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

export function editProfile() {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
    method: 'PATCH',
      headers: {
        authorization: '1208a5bc-6444-426d-b821-a061b16240e2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': 'Annie Aster',
        'about': 'Web-developer'
      })
    })
}


export function newCard() {
  return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
    method: 'POST',
      headers: {
        authorization: '1208a5bc-6444-426d-b821-a061b16240e2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': 'Байкал',
        'link': 'https://pictures.s3.yandex.net/frontend-developer/ava.jpg'
      })
    })
}