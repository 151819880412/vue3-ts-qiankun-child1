
export interface UserState{
    token: string
    name: string
    avatar: string
    introduction: string
    roles: string[]
    email: string
}

 const state: UserState = {
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: ''
}

type UserStateType = typeof state;
export { UserStateType, state };