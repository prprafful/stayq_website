import { reaction, IReactionDisposer } from 'mobx';

import { getCurrentUser, saveCurrentUser } from '../api';
// import * as Sentry from '@sentry/browser';
import { types, flow, Instance, cast } from 'mobx-state-tree';
import User from './User';

const UserStore = types
  .model('UserStore', {
    currentUser: types.maybe(User),
    loading: false,
    saving: false,
    role: types.maybe(types.union(types.literal('coach'), types.literal('student'), types.literal('guest'))),
    saveError: types.maybe(types.map(types.array(types.string))),
  })
  .actions((self) => ({
    saveCurrentUser: flow(function* ({ name }: { name: string }) {
      self.saving = true;
      self.saveError = undefined;
      try {
        const response = yield saveCurrentUser({ name });
        if (response.problem) {
          if (response.status === 400) {
            self.saveError = cast({ __main__: ['Please check your fields'], ...response.data });
          } else {
            self.saveError = cast({ __main__: [response.problem] });
          }
          throw new Error(response.problem);
        }
        const { coach, student, guest } = response.data;
        if (student) {
          self.currentUser = student;
          self.role = 'student';
        }
        if (coach) {
          self.currentUser = coach;
          self.role = 'coach';
        }
        if (guest) {
          self.currentUser = guest;
          self.role = 'guest';
        }
      } finally {
        self.saving = false;
      }
    }),
  }))
  .actions((self) => {
    var rx: IReactionDisposer | null = null;
    function afterCreate() {
      rx = reaction(
        () => self.currentUser,
        (user) => {
          const sentryUser = user ? { id: user.username } : null;
          // Sentry.configureScope(function (scope) {
          //   scope.setUser(sentryUser);
          // });
        }
      );
    }

    function beforeDestroy() {
      rx && rx();
    }

    const pullUser = flow(function* () {
      self.loading = true;
      try {
        const response = yield getCurrentUser();
        if (response.problem) {
          if (response.status === 401 || response.status === 403) return;
          throw new Error('Failed to load user');
        }
        const { coach, student, guest } = response.data;
        if (student) {
          self.currentUser = student;
          self.role = 'student';
        }
        if (coach) {
          self.currentUser = coach;
          self.role = 'coach';
        }
        if (guest) {
          self.currentUser = guest;
          self.role = 'guest';
        }
      } finally {
        self.loading = false;
      }
    });

    function forgetUser() {
      self.currentUser = undefined;
    }

    return {
      afterCreate,
      pullUser,
      forgetUser,
      beforeDestroy,
    };
  })
  .views((self) => ({
    get isCoach() {
      return self.role === 'coach';
    },
    get isStudent() {
      return self.role === 'student';
    },
    get isGuest() {
      return self.role === 'guest';
    },
  }));
export default UserStore;
export interface IUserStore extends Instance<typeof UserStore> {}
