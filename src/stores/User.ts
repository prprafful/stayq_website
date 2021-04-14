import { types, Instance } from "mobx-state-tree";

const UserAvatar = types.model("UserAvatar", {
  name: types.string,
  image_url: types.string,
  primary_color: types.string,
  secondary_color: types.string
});

const User = types.model("User", {
  username: types.identifier,
  first_name: types.string,
  name: types.string,
  avatar: UserAvatar
});

export default User;

export interface IUser extends Instance<typeof User> {}
export interface IUserAvatar extends Instance<typeof UserAvatar> {}
export interface UserMap {[key:string]: IUser|undefined}


const Student = User.named("Student").props({
  grade: types.maybe(types.string)
});

const StudentLite = types.model('StudentLite', {
  username: types.identifier,
  name: types.string,
})

export { Student, StudentLite };
export interface IStudent extends Instance<typeof Student> {}
export interface IStudentLite extends Instance<typeof StudentLite> {}
export interface StudentMap {[key:string]: IStudent}
