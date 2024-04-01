type LetterUser = {
  id: number
  name: string
  coordinate: number[]
}

type LetterStatus = {
  SENDING: 0
  ARRIVED: 1
  DELETED: 2
}

type LetterType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type MovementIntervalType =
  | 1
  | 0.5
  | 0.1
  | 0.05
  | 0.01
  | 0.005
  | 0.001
  | 0.0005
  | 0.0001
  | 0.00005

type Distances = {
  x: number
  y: number
  hypotenuse: number
}

export type LetterDetail = {
  id: number
  sender: LetterUser
  recipient: LetterUser
  message: string
  status: LetterStatus
  letterType: LetterType
  movementInterval: MovementIntervalType
  totalMoveCnt: number
  distances: Distances
  moveCoordinate: [number, number][]
  tangent: number
  sine: number
  sinAngle: number
  isAlreadyRead: boolean
  isArrived: boolean
  totalMoveSec: number
  arrivalDate: string
  createdAt: string
}

export type LettersResponse = LetterDetail[]
