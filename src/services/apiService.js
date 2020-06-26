export default class ApiService {

  _apiBase = 'https://5ef17da91faf160016b4d7ef.mockapi.io/'

  getResource = async (query) => {
    return await fetch(`${this._apiBase}${query}`)
      .then(res => res.json())
      .catch(err => {
        throw new Error(`Error connectiong to ${this._apiBase}${query}, error ${err}`)
      });
  };

  postResource = async (query, method, body = {}) => {
    return await fetch(`${this._apiBase}${query}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: method,
      body: JSON.stringify(body)
    })
      .then(res => res)
      .catch(err => {
        throw new Error(`Error connectiong to ${this._apiBase}${query}, error: ${err}`)
      });
  }

  auth = async (login, password) => {
    if(login == "user" && password == "12345") return 1; // return user ID in data base
    throw new Error(`Incorrect login or password`)
  }

  getUser = async (userId) => {
    const res = await this.getResource(`users/${userId}`)
    return res;
  }

  getContacts = async (userId) => {
    const res = await this.getResource(`users/${userId}/contacts`);
    return res;
  }

  addContact = async(userId, contact) => {
    await this.postResource(`users/${userId}/contacts/`, 'POST', {...contact});
  }

  editContact = async(userId, id, changedContact) => {
    await this.postResource(`users/${userId}/contacts/${id}`, 'PUT', {...changedContact});
  }

  deleteContact = async(userId, id) => {
    await this.postResource(`users/${userId}/contacts/${id}`, 'DELETE');
  }

}