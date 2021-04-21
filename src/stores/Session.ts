import { parse } from 'fecha';
import { cast, flow, getEnv, Instance, types } from 'mobx-state-tree';
// import { fetchSessionActivityHistory, setSessionCompleted } from '../api';
import Sprint from './Sprint';
import { Student } from './User';

// export const SessionRating = types
//   .model({
//     rating: 0,
//     issues: '',
//     category: types.string,
//   })
//   .actions((self) => ({
//     setRating(rating: number) {
//       self.rating = rating;
//     },
//     setIssues(issues: string) {
//       self.issues = issues;
//     },
//   }));

// export interface ISessionRating extends Instance<typeof SessionRating> {}

// const StudentActivityLog = types.model('StudentActivityLog', {
//   started_at: types.string,
//   completed_at: types.maybeNull(types.string),
//   duration: types.maybeNull(types.string),
//   admin_url: types.string,
// });

// export interface IStudentActivityLog extends Instance<typeof StudentActivityLog> {}

export const Session = types
  .model({
    name: types.identifier,
    start_at: types.string,
    completed_at: types.maybeNull(types.string),
    sprint: Sprint,
    students: types.array(Student),
    // ratingsList: types.array(SessionRating),
    // activityLogs: types.maybe(types.map(types.map(StudentActivityLog))),
    starts_in: types.maybe(types.number),
  })
  .views((self) => ({
    get startAtDate() {
      return parse(self.start_at, 'YYYY-MM-DDTHH:mm:ssZZ');
    },
    get isDone() {
      return self.completed_at !== null;
    },
    // get ratingInited() {
    //   return self.ratingsList.length > 0;
    // },
  }))
  // .actions((self) => ({
  //   markCompleted: flow(function* () {
  //     const response = yield setSessionCompleted({
  //       session_name: self.name,
  //       feedbacks: self.ratingsList,
  //     });

  //     if (response.problem) {
  //       return;
  //     }
  //     self.completed_at = response.data.completed_at;
  //   }),
  //   initRatings() {
  //     const RATING_CATEGORIES = [
  //       'default',
  //       'coach-student-difficulty',
  //       'coach-student-engagement',
  //       'coach-lp-smoothness',
  //     ];
  //     self.ratingsList = cast(RATING_CATEGORIES.map((category) => SessionRating.create({ category })));
  //   },
  //   loadActivityHistory: flow(function* () {
  //     const response = yield fetchSessionActivityHistory({
  //       session_name: self.name,
  //     });
  //     if (response.problem) {
  //       getEnv(self).commonStore.setNetworkProblem(response.problem);
  //       return;
  //     }
  //     self.sprint = response.data.sprint;
  //     self.activityLogs = response.data.activity_logs;
  //   }),
  // }));

export interface ISession extends Instance<typeof Session> {}

// export const TutorSession = types
//   .model('TutorSession', {
//     name: types.identifier,
//     start_at: types.string,
//     sprint: Sprint,
//   })
//   .views((self) => ({
//     get startAtDate() {
//       return parse(self.start_at, 'YYYY-MM-DDTHH:mm:ssZZ');
//     },
//   }))
//   .actions((self) => ({}));

// export const CompletedStudentSession = types
//   .model('CompletedStudentSession', {
//     session: types.maybe(TutorSession),
//     attendance: types.maybeNull(types.boolean),
//     feedback: types.maybeNull(types.number),
//   })
//   .actions((self) => ({}));

// export interface ICompletedStudentSession extends Instance<typeof CompletedStudentSession> {}
