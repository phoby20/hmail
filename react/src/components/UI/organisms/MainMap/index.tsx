import React, { useRef, useEffect, useState, useContext } from 'react'
import * as maptilersdk from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import styles from './style.module.scss'
import { customMapEffect } from './function'
import { Context } from '../../../../Root'
import { LettersResponse, LetterDetail } from '../../../../type/letter'

type MainMap = {
  letters: LettersResponse
  clickLetter: (letter: LetterDetail) => void
}

function MainMap({ letters, clickLetter }: MainMap) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const tokyo = { lng: 139.753, lat: 35.6844 }
  const [zoom] = useState(12)
  const map = useRef<maptilersdk.Map | null>(null)
  const { loggedInUser } = useContext(Context)

  const payload = {
    tokyo,
    mapContainer,
    zoom,
    map,
    loggedInUser,
    letters,
    clickLetter,
  }

  useEffect(() => {
    customMapEffect(payload)
  }, [])

  return (
    <div>
      <div className={styles.map_wrap}>
        <div ref={mapContainer} className={styles.map} />
      </div>
    </div>
  )
}

export default MainMap
