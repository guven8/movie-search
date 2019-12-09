export interface JSendSuccess<T> {
  status: number;
  statusText: 'OK';
  data: T & { Response: 'True' }
}

export interface JSendFailure {
  status: number;
  statusText: 'OK';
  data: {
    Response: 'False',
    Error: string;
  }
}