import { types, flow, cast, getEnv } from 'mobx-state-tree';
import {
//   listMasterclasses as listSessions,
//   getMasterclassDetail as getSessionDetail,
//   listActiveSessions as listActiveSessionsAPI,
  masterClassRegister,
  fetchOpenMasterClassSession,
} from 'api';
import { Session, ISession } from './Session';
// import { ApiResponse } from 'apisauce';
// import { PageStore } from './Page';

const MasterclassStore = types
  .model({
    // currentSession: types.maybe(types.safeReference(Session)),
    upcomingSessions: types.array(types.safeReference(Session)),
    fetchingSession: false,
    sessions: types.array(Session),
    // errors: types.optional(types.string, ''),
    // creating: false,
    // upcomingSessionsPage: types.maybe(PageStore),
  })
  .actions((self) => {
    function setSessions(sessions: any) {
      self.sessions = cast(sessions);
    }

    // function clear() {
    //   self.sessions = cast([]);
    //   self.currentSession = undefined;
    // }

    // const fetchUpcomingSessions = flow(function* ({
    //   page = 1,
    //   pageSize,
    //   test = undefined,
    // }: {
    //   page?: number;
    //   pageSize?: number;
    //   test?: boolean;
    // }) {
    //   self.fetchingSession = true;
    //   const response = yield listSessions({ upcoming: true, page, pageSize, test });
    //   if (response.problem) {
    //     getEnv(self).commonStore.setNetworkProblem(response.problem);
    //     return;
    //   }
    //   setSessions(response.data.results);
    //   self.upcomingSessions = response.data.results.map((x: { name: string }) => x.name);
    //   self.upcomingSessionsPage = response.data.page;
    //   self.fetchingSession = false;
    // });

    // const listActiveSessions = flow(function* () {
    //   self.fetchingSession = true;
    //   try {
    //     const response: ApiResponse<any> = yield listActiveSessionsAPI();
    //     if (response.problem) {
    //       if (response.status === 403) {
    //         self.errors = 'Unauthorised';
    //       }
    //       if (response.status === 500) {
    //         self.errors = 'Oops!';
    //       }
    //       return;
    //     }
    //     setSessions(response.data);
    //   } finally {
    //     self.fetchingSession = false;
    //   }
    // });

    // const fetchSession = flow(function* (session_name: string) {
    //   self.fetchingSession = true;
    //   const response = yield getSessionDetail({ session_name });
    //   if (response.problem) {
    //     if (response.status === 404 || response.status === 403) {
    //       return;
    //     }
    //     getEnv(self).commonStore.setNetworkProblem(response.problem);
    //     return;
    //   }
    //   setSessions([response.data]);
    //   setCurrentSession(response.data);
    //   self.fetchingSession = false;
    // });

    // function setCurrentSession(session: ISession) {
    //   self.currentSession = session.name as any;
    // }

    const masterclassRegister = flow(function* (sessionName: string) {
      const response = yield masterClassRegister({ sessionName });
      if (response.problem) {
        getEnv(self).commonStore.setNetworkProblem(response.problem);
        return;
      }
    });

    const fetchUpcomingOpenSessions = flow(function* () {
      self.fetchingSession = true;
      const response = yield fetchOpenMasterClassSession();
      if (response.problem) {
        getEnv(self).commonStore.setNetworkProblem(response.problem);
        return;
      }
      setSessions(response.data.results);
      self.upcomingSessions = response.data.results.map((x: { name: string }) => x.name);
      // self.upcomingSessionsPage = response.data.page;
      self.fetchingSession = false;
    });

    return {
      // fetchUpcomingSessions,
      // setCurrentSession,
      // fetchSession,
      // listActiveSessions,
      // clear,
      masterclassRegister,
      fetchUpcomingOpenSessions
    };
  });

export default MasterclassStore;
