let countTickets = 0;

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

  static formatTickets = (res) => {
    const formatArr = res.tickets.map((ticket) => ({
      ...ticket,
      id: crypto.randomUUID(),
    }));
    return { ...res, tickets: formatArr };
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
      const res = await this.getResource('/search');
      if (res.searchId) {
        return res.searchId;
      }
    } catch (error) {
      console.log('Error with getResource');
    }
    return null;
  };

  getPackTickets = async (searchId) => {
    try {
      const res = await this.getResource('/tickets', `searchId=${searchId}`);
      const formatRes = ApiService.formatTickets(res);
      countTickets += formatRes.tickets.length;
      console.log('Считаем билеты: ', countTickets);
      return formatRes;
    } catch (error) {
      console.log(
        'Server error with getting a stack of tickets. Reconnecting...',
      );
    }
    return { tickets: [], stop: false, error: true };
  };
}

export default ApiService;
