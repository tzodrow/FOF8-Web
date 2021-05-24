import * as rax from 'retry-axios';
import axios, { AxiosResponse } from "axios";
import { IRecord } from '../models/record';
import { ILeague } from '../models/league';
import { IFileHistory } from '../models/fileHistory';
import { IPlayerInformation } from '../models/player';

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

export const getPlayers = (leagueId: string, skip: number, setPlayers: (players: Array<IPlayerInformation>) => void) => {
  myAxiosInstance
    .get(`/api/player?LeagueId=${leagueId}&Skip=${skip}`)
    .then(res => {
      setPlayers(res.data.data);
    })
    .catch(e => {
      console.error(e);
    });
}

export const getLeagues = (setLeagues: (leagues: Array<ILeague>) => void) => {
  myAxiosInstance
    .get("/api/league")
    .then(res => {
      setLeagues(res.data.data);
    })
    .catch(e => {
      console.error(e);
    });
}

export const createLeague = (league: ILeague, setLeague?: (league: ILeague) => void) => {
  myAxiosInstance
    .post("/api/league", league)
    .then(res => {
      if (setLeague) {
        setLeague(res.data.data);
      }
    })
    .catch(e => {
      console.error(e);
    })
}

export const getFileHistories = (leagueId: string, setFileHistories: (fileHistories: Array<IFileHistory>) => void) => {
  myAxiosInstance
    .get(`/api/fileHistory?LeagueId=${leagueId}`)
    .then(res => {
      setFileHistories(res.data.data);
    })
    .catch(e => {
      console.error(e);
    });
}

export const upsertFileHistory = (fileHistory: IFileHistory) => {
  myAxiosInstance
    .put("/api/fileHistory", fileHistory)
    .then(res => {
    })
    .catch(e => {
      console.error(e);
    });
}

export const completeFileHistory = (fileHistory: IFileHistory) => {
  myAxiosInstance
    .put("/api/fileHistory/complete", fileHistory)
    .then(res => {
    })
    .catch(e => {
      console.error(e);
    });
}
