import * as rax from 'retry-axios';
import axios, { AxiosResponse } from "axios";
import { IRecord } from '../models/record';

const myAxiosInstance = axios.create();
myAxiosInstance.defaults.raxConfig = {
  instance: myAxiosInstance,
  retry: 3,
  noResponseRetries: 4,
  backoffType: 'exponential',
  statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
  httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
  onRetryAttempt: err => {
    const cfg = rax.getConfig(err);
    console.log(`Retry attempt #${cfg?.currentRetryAttempt}`);
  }
};
rax.attach(myAxiosInstance);

export const upsertRecord = (record: IRecord | Array<IRecord>, successCallback?: (res: AxiosResponse<any>) => void, failureCallback?: () => void) => {
  myAxiosInstance
    .put("/api/player/upsert", record)
    .then((res) => {
      if (successCallback) {
        successCallback(res);
      }
    })
    .catch((e) => {
      console.error("Error : ", e);
      if (failureCallback) {
        failureCallback();
      }
    });
}

export const upsertRating = (record: IRecord | Array<IRecord>, successCallback?: (res: AxiosResponse<any>) => void, failureCallback?: () => void) => {
  myAxiosInstance
    .put("/api/player/upsertRating", record)
    .then((res) => {
      if (successCallback) {
        successCallback(res);
      }
    })
    .catch((e) => {
      console.error("Error : ", e);
      if (failureCallback) {
        failureCallback();
      }
    });
}

export const createLeague = () => {
  myAxiosInstance
    .post("/api/league", { Name: "Test League", CreateData: new Date(), Active: true })
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.error(e);
    })
}