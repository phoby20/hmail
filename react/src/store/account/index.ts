import { atom } from 'recoil'

export const defaultAccount = {
  name: '',
  email: '',
  password: '',
  coordinate: [0, 0],
}

export const registAccountState = atom({
  key: 'userAccount',
  default: defaultAccount,
})
