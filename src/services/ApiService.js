/* eslint-disable max-classes-per-file */
class ResponseError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ResponseError';
    this.status = status;
  }
}

class ApiService {
  #apiBase = 'https://aviasales-test-api.kata.academy';

  #searchId = '';

  #qureyAuth = '';

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
    controller,
    options = this.fetchOptions,
    apiBase = this.#apiBase,
  ) => {
    const res = await fetch(`${apiBase}${url}?${this.#qureyAuth}${query}`, {
      ...options,
      signal: controller.signal,
    });
    if (!res.ok)
      throw new ResponseError(
        `Could not fetch ${url}, recieved ${res.status}`,
        res.status,
      );
    const body = await res.json();
    return body;
  };

  getSearchId = async (controller) => {
    try {
      const res = await this.getResource('/search', '', controller);
      if (res.searchId) {
        return res.searchId;
      }
    } catch (error) {
      // console.log('Error with getResource');
    }
    return null;
  };

  getPackTickets = async (searchId, controller) => {
    try {
      const res = await this.getResource(
        '/tickets',
        `searchId=${searchId}`,
        controller,
      );
      const formatRes = ApiService.formatTickets(res);
      return formatRes;
    } catch (error) {
      if (error.status === 500) {
        return { tickets: [], stop: false, skip: true };
      }
      return { tickets: [], stop: false, skip: true, error: true };
    }
  };
}

export default ApiService;
