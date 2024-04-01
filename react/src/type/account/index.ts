import { RecoilState } from 'recoil'

export type AccountInfo = {
  name: string
  email: string
  password: string
  coordinate: number[]
}

export type RegistAccountStateType = RecoilState<AccountInfo>

export type LoginInfo = {
  email: string
  password: string
}

export type ApiError = {
  message: string
  response: {
    status: number
  }
}

export type LoggedInUser = {
  id: number
  name: string
  coordinate: number[]
}
