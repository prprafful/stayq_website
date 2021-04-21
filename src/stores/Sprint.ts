// import { fetchActivityDetail } from 'api';
// import { fetchSprint, listCourseSprints, listSprints } from 'api/coachDashboard';
// import { ApiResponse } from 'apisauce';
import { types, Instance, flow, getEnv, SnapshotIn } from 'mobx-state-tree';
// import { ActivityDetail } from './ActivityDetail';
// import { CourseLate } from './CourseStore';
// import { MasteryLearningObjective } from './MasteryLearningObjective';
// import { PageStore } from './Page';

// export const ActivitySummary = types
//   .model({
//     name: types.string,
//     activity_uuid: types.string,
//     is_optional: false,
//     activity_type: types.string,
//     // only for coaches
//     expected_duration: types.maybeNull(types.string),
//     coach_instructions: types.maybeNull(types.string),
//     coach_tips: types.maybeNull(types.string),
//     activityDetail: types.maybe(ActivityDetail),
//   })
//   .actions((self) => ({
//     loadDetail: flow(function* () {
//       try {
//         const response = yield fetchActivityDetail({ activity_uuid: self.activity_uuid });
//         return response.data;
//       } finally {
//       }
//     }),
//   }));

// export interface IActivitySummary extends SnapshotIn<typeof ActivitySummary> {}
// export interface IActivitySummaryFull extends Instance<typeof ActivitySummary> {}

// export const Playlist = types.model({
//   name: types.string,
//   title: types.string,
//   activities: types.array(ActivitySummary),
//   mode: types.union(
//     types.literal('live'),
//     types.literal('individual'),
//     types.literal('group'),
//     types.literal('project'),
//     types.literal('homework'),
//     types.literal('checkpoint'),
//     types.literal('masterclass')
//   ),
//   show_station_intro: false,
// });

// export interface IPlaylist extends Instance<typeof Playlist> {}

const Sprint = types.model({
  name: types.string,
  title: types.string,
  description: types.string,
  image_url: types.maybeNull(types.string),
  // course: types.maybeNull(types.late(CourseLate)),
  // playlists: types.array(Playlist),
  // learning_objectives: types.array(MasteryLearningObjective),
  unit_index: '',
});

export default Sprint;
export interface ISprint extends Instance<typeof Sprint> {}

// export const SprintStore = types
//   .model('SprintStore', {
//     loading: false,
//     loaded: false,
//     page: types.maybe(PageStore),
//     sprints: types.array(Sprint),
//     currentSprint: types.maybe(Sprint),
//     loadError: types.maybe(types.string),
//   })
//   .actions((self) => ({
//     listSprints: flow(function* ({ pageNumber, q }: { pageNumber?: number; q?: string }) {
//       try {
//         self.loading = true;
//         self.loaded = false;

//         const response: ApiResponse<any> = yield listSprints({ pageNumber, q });
//         if (response.problem) {
//           getEnv(self).commonStore.setNetworkProblem(response.problem);
//           return;
//         }
//         self.page = response.data.page;
//         self.sprints = response.data.results;
//         self.loaded = true;
//       } finally {
//         self.loading = false;
//       }
//     }),

//     listSprintsByCourse: flow(function* ({
//       pageNumber,
//       courseName,
//       q,
//     }: {
//       pageNumber?: number;
//       courseName: string;
//       q?: string;
//     }) {
//       try {
//         self.loading = true;
//         self.loaded = false;

//         const response: ApiResponse<any> = yield listCourseSprints({ pageNumber, courseName, q });
//         if (response.problem) {
//           getEnv(self).commonStore.setNetworkProblem(response.problem);
//           return;
//         }
//         self.page = response.data.page;
//         self.sprints = response.data.results;
//         self.loaded = true;
//       } finally {
//         self.loading = false;
//       }
//     }),

//     fetchSprint: flow(function* (sprint_name: string) {
//       try {
//         self.loading = true;
//         const response: ApiResponse<any> = yield fetchSprint({ sprint_name });
//         if (response.status === 404) {
//           self.loadError = 'NOT_FOUND';
//           return;
//         }
//         if (response.problem) {
//           getEnv(self).commonStore.setNetworkProblem(response.problem);
//           return;
//         }
//         self.currentSprint = response.data;
//       } finally {
//         self.loading = false;
//       }
//     }),
//   }));
