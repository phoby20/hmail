import * as maptilersdk from '@maptiler/sdk'
import * as d3 from 'd3'
import { LoggedInUser } from '../../../../type/account'
import paperAirplane from '../../../../media/img/paper_airplane.png'
import { LettersResponse, LetterDetail } from '../../../../type/letter'

type MapDataType = {
  type: string
  features: {
    type: string
    geometry: {
      type: string
      coordinates: [number, number][]
    }
  }[]
}

export type Payload = {
  tokyo: {
    lng: number
    lat: number
  }
  mapContainer: React.RefObject<HTMLDivElement>
  zoom: number
  map: React.MutableRefObject<maptilersdk.Map | null>
  loggedInUser: LoggedInUser | null
  letters: LettersResponse
  clickLetter: (letter: LetterDetail) => void
}

export const customMapEffect = ({
  tokyo,
  mapContainer,
  zoom,
  map,
  loggedInUser,
  letters,
  clickLetter,
}: Payload) => {
  if (map.current) return // stops map from intializing more than once
  const customCoordinate = loggedInUser
    ? loggedInUser.coordinate
    : [tokyo.lng, tokyo.lat]
  // apikey를 불러온다
  const apiKey = process.env.REACT_APP_MAPTILER_API as string
  maptilersdk.config.apiKey = apiKey

  map.current = new maptilersdk.Map({
    container: mapContainer.current!,
    style: maptilersdk.MapStyle.STREETS,
    center: customCoordinate as [number, number],
    zoom: zoom,
  })

  // 유저가 로그인을 했다면 지도상에 유저의 위치가 보이도록 마커를 설정한다
  if (loggedInUser) {
    new maptilersdk.Marker({ color: '#FF0000' })
      .setLngLat(customCoordinate as [number, number])
      .addTo(map.current)
  }

  map.current.on('load', async function () {
    try {
      loadOnMap(map)

      letters.forEach((letter) => {
        if (!letter.moveCoordinate.length) return
        const markers = createAirplane(map, letter, clickLetter)
        let i = 0
        const intervalId = setInterval(() => {
          markers?.setLngLat(letter.moveCoordinate[i] as [number, number])
          i++
          if (i >= letter.moveCoordinate.length) {
            clearInterval(intervalId)
          }
        }, 1000)
      })
    } catch (err) {
      console.error('There was a problem with your fetch operation:', err)
    }
  })
}

/**
 * 지도를 불러온다
 * @param map
 * @returns
 */
const loadOnMap = async (
  map: React.MutableRefObject<maptilersdk.Map | null>,
) => {
  const mapData: MapDataType | undefined = await d3.json(
    'https://docs.maptiler.com/sdk-js/assets/hike.geojson',
  ) // 지도 데이터를 가져온다
  if (!mapData || !map.current) return
  const coordinate = mapData.features[0].geometry.coordinates
  mapData.features[0].geometry.coordinates = [coordinate[0]]

  // add it to the map
  map.current.addSource('trace', { type: 'geojson', data: mapData })
}

/**
 * 飛行機のアイコン描画及びクリック時の動作制御
 * @param marker APIから取得した、一つの飛行機情報
 * @param map mapのReactiveデータ
 * @returns 飛行機markerインスタンス
 */
const createAirplane = (
  map: React.MutableRefObject<maptilersdk.Map | null>,
  letter: LetterDetail,
  clickLetter: (letter: LetterDetail) => void,
) => {
  if (!map.current) return
  const parentEl = document.createElement('div')
  const childEl = document.createElement('div')
  childEl.style.backgroundImage = `url(${paperAirplane})`
  childEl.style.width = '35px'
  childEl.style.height = '35px'
  childEl.style.backgroundSize = 'cover'
  childEl.style.transform = `rotate(${letter.sinAngle}deg)`
  childEl.style.webkitTransform = `rotate(${letter.sinAngle}deg)`

  // 비행기를 클릭했을 때 발화
  parentEl.addEventListener('click', function () {
    clickLetter(letter)
  })

  parentEl.appendChild(childEl)

  return new maptilersdk.Marker({ element: parentEl })
    .setLngLat(letter.moveCoordinate[0] as [number, number])
    .addTo(map.current)
}
