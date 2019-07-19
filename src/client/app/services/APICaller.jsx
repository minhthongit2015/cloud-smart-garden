import superagent from 'superagent';

export default class APICaller {
  static async get({ url, returnHandle = false }) {
    const request = superagent.get(url).then();
    return returnHandle ? request : request.then();
  }

  static async post({ url, data, returnHandle = false }) {
    const request = superagent.post(url).send(data);
    return returnHandle ? request : request.then();
  }

  static async put({ url, data, returnHandle = false }) {
    const request = superagent.put(url).send(data);
    return returnHandle ? request : request.then();
  }

  static async patch({ url, data, returnHandle = false }) {
    const request = superagent.patch(url).send(data);
    return returnHandle ? request : request.then();
  }

  static async delete({ url, returnHandle = false }) {
    const request = superagent.delete(url);
    return returnHandle ? request : request.then();
  }

  static pipe({ url }) {
    return superagent(url);
  }
}
