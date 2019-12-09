import axios, { AxiosResponse } from 'axios';
import { JSendSuccess, JSendFailure } from '../common/jsendResponse';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export abstract class RemoteService {
  protected abstract baseUri: string;
  protected abstract apiKey: string;

  protected async callService<S>(
    method: 'GET',
    path: string,
    qs?: {}
  ): Promise<JSendSuccess<S> | JSendFailure>;
  protected async callService<S>(
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body?: {},
    qs?: {}
  ): Promise<JSendSuccess<S>>;
  protected async callService<S>(
    method: HttpMethod,
    path: string,
    bodyOrQs?: {},
    qs?: {}
  ): Promise<JSendSuccess<S>> {
    let body;
    if (method === 'GET' && bodyOrQs && !qs) {
      qs = bodyOrQs;
    } else {
      body = bodyOrQs;
    }

    const fullUri = this.baseUri.concat(path);

    const params = { ...qs, apiKey: this.apiKey };

    return axios({
      url: fullUri,
      method,
      params,
      data: body
    }) as any;
  }
}
