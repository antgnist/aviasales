class ApiService {
  #apiBase = 'https://aviasales-test-api.kata.academy';

  #searchId = '';

  #qureyAuth = ''; // `searchId=${this.#searchId}`;

  headers = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  fetchOptions = {
    method: 'GET',
    headers: this.headers,
    redirect: 'follow',
  };

  getResource = async (
    url,
    query = '',
    headers = this.fetchOptions,
    apiBase = this.#apiBase,
  ) => {
    const res = await fetch(
      `${apiBase}${url}?${this.#qureyAuth}${query}`,
      headers,
    );
    if (!res.ok)
      throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
    const body = await res.json();
    return body;
  };

  getSearchId = async () => {
    try {
      const res = await this.getResource('/searchpppp');
      if (res.searchId) {
        return res.searchId;
      }
    } catch (error) {
      console.log('Error with getResource');
    }
    return null;
  };
}

export default ApiService;
