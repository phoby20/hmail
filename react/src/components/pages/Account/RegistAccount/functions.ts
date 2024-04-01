import { NavigateFunction } from 'react-router-dom'
import { constants } from '../../../../constants'
import * as maptilersdk from '@maptiler/sdk'
import { AccountInfo } from '../../../../type/account'
import { SetterOrUpdater } from 'recoil'
import { checkEmptyValues, checkValidation } from './validation'

const { LOCATION } = constants

type TokyoType = {
  lng: number
  lat: number
}

export const useMapEffect =
  (
    account: AccountInfo,
    tokyo: TokyoType,
    mapContainer: React.RefObject<HTMLDivElement>,
    zoom: number,
    map: React.MutableRefObject<maptilersdk.Map | null>,
    setAccount: SetterOrUpdater<AccountInfo>,
    setCoordinate: SetterOrUpdater<number[]>,
    setMapMarkerState: React.Dispatch<
      React.SetStateAction<{
        noMoveMarker: boolean
      }>
    >,
  ) =>
  () => {
    if (map.current) return // stops map from intializing more than once
    initPassword(setAccount, setCoordinate)

    // Maptiler apikey를 불러온다
    const apiKey = process.env.REACT_APP_MAPTILER_API as string
    maptilersdk.config.apiKey = apiKey

    // 이전에 마크를 이동한 적이 있다면 이동시킨 좌표를 맵에 표시시킨다
    const checkCoordinate = () => {
      const [lng, lat] = account.coordinate
      if (lng === 0 && lat === 0) {
        return [tokyo.lng, tokyo.lat]
      }
      return [lng, lat]
    }
    const nowCoordinate = checkCoordinate() as [number, number]

    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.OUTDOOR,
      center: nowCoordinate,
      zoom: zoom,
    })

    let marker = new maptilersdk.Marker({
      draggable: true,
    })
      .setLngLat(nowCoordinate)
      .addTo(map.current)

    function onDragEnd() {
      let lngLat = marker.getLngLat()
      setCoordinate([lngLat.lng, lngLat.lat])
      setAccount((prevState) => {
        return Object.assign(
          { ...prevState },
          { coordinate: [lngLat.lng, lngLat.lat] },
        )
      })
      setMapMarkerState((prevState) => {
        return Object.assign({ ...prevState }, { noMoveMarker: false })
      })
    }

    marker.on('dragend', onDragEnd)
  }

// change Name
export const updateName =
  (
    setAccount: SetterOrUpdater<AccountInfo>,
    setNameState: React.Dispatch<
      React.SetStateAction<{
        noName: boolean
      }>
    >,
  ) =>
  (name: string) => {
    setNameState((prevState) => {
      return Object.assign({ ...prevState }, { noName: false })
    })
    setAccount((prevState) => {
      return Object.assign({ ...prevState }, { name: name })
    })
  }

// change email
export const updateEmail =
  (
    setAccount: SetterOrUpdater<AccountInfo>,
    setEmailValidationState: React.Dispatch<
      React.SetStateAction<{
        emailValidationErr: boolean
      }>
    >,
    setEmailState: React.Dispatch<
      React.SetStateAction<{
        noEmail: boolean
      }>
    >,
  ) =>
  (email: string) => {
    setEmailValidationState({ emailValidationErr: false })
    setEmailState({ noEmail: false })
    setAccount((prevState) => {
      return Object.assign({ ...prevState }, { email: email })
    })
  }

// update password
export const updateStatePassword =
  (
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setPasswordState: React.Dispatch<
      React.SetStateAction<{
        noPassword: boolean
      }>
    >,
    setInappropriatePasswordState: React.Dispatch<
      React.SetStateAction<{
        inappropriatePassword: boolean
      }>
    >,
  ) =>
  (password: string) => {
    setInappropriatePasswordState((prevState) => {
      return Object.assign({ ...prevState }, { inappropriatePassword: false })
    })
    setPassword(password)
    setPasswordState((preveState) => {
      return Object.assign({ ...preveState }, { noPassword: false })
    })
  }

export const checkPassword =
  (
    originPassword: string,
    setPasswordNoMatchErrorState: React.Dispatch<
      React.SetStateAction<{
        isError: boolean
      }>
    >,
    setAccount: SetterOrUpdater<AccountInfo>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setPasswordState: React.Dispatch<
      React.SetStateAction<{
        noPassword: boolean
      }>
    >,
  ) =>
  (inputPassword: string) => {
    // Cancels the password error message when entering password confirmation.
    setPasswordState((preveState) => {
      return Object.assign({ ...preveState }, { noPassword: false })
    })
    if (originPassword !== inputPassword) {
      setPasswordNoMatchErrorState({
        isError: true,
      })
    } else {
      setPasswordNoMatchErrorState({
        isError: false,
      })
      setPassword(inputPassword)
      setAccount((prevState) => {
        return Object.assign({ ...prevState }, { password: inputPassword })
      })
      setPasswordState((preveState) => {
        return Object.assign({ ...preveState }, { noPassword: false })
      })
    }
  }

export const goToRegistConfirm = (
  navigate: NavigateFunction,
  passwordNoMatchErrorState: {
    isError: boolean
  },
  isPasswordState: {
    noPassword: boolean
  },
  mapMarkerState: {
    noMoveMarker: boolean
  },
  account: AccountInfo,
  coordinate: number[],
  setAccount: SetterOrUpdater<AccountInfo>,
  setPasswordState: React.Dispatch<
    React.SetStateAction<{
      noPassword: boolean
    }>
  >,
  setMapMarkerState: React.Dispatch<
    React.SetStateAction<{
      noMoveMarker: boolean
    }>
  >,
  setEmailValidationState: React.Dispatch<
    React.SetStateAction<{
      emailValidationErr: boolean
    }>
  >,
  setEmailState: React.Dispatch<
    React.SetStateAction<{
      noEmail: boolean
    }>
  >,
  setNameState: React.Dispatch<
    React.SetStateAction<{
      noName: boolean
    }>
  >,
  setInappropriatePasswordState: React.Dispatch<
    React.SetStateAction<{
      inappropriatePassword: boolean
    }>
  >,
) => {
  const newLng = coordinate[0]
  const newLat = coordinate[1]
  setAccount((prevState) => {
    return Object.assign({ ...prevState }, { coordinate: [newLng, newLat] })
  })

  const isEmpty = checkEmptyValues(account, setPasswordState, setMapMarkerState)
  const isValidationError = checkValidation(
    account,
    setEmailValidationState,
    setEmailState,
    setNameState,
    setInappropriatePasswordState,
  )
  if (
    !passwordNoMatchErrorState.isError &&
    !isPasswordState.noPassword &&
    !mapMarkerState.noMoveMarker &&
    !isValidationError &&
    !isEmpty
  ) {
    navigate(LOCATION.PATH.REGIST_CONFIRM)
  }
}

const initPassword = (
  setAccount: SetterOrUpdater<AccountInfo>,
  setCoordinate: SetterOrUpdater<number[]>,
) => {
  setAccount((prevState) => {
    setCoordinate(prevState.coordinate)
    return Object.assign({ ...prevState }, { password: '' })
  })
}

export const goToBack = (navigate: NavigateFunction) => {
  navigate(LOCATION.PATH.LOGIN)
}
