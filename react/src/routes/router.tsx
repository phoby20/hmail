import { createBrowserRouter } from 'react-router-dom'
import Root from '../Root'
import NotFound from '../components/pages/Error/notFound'
import Home from '../components/pages/Home'
import Mypage from '../components/pages/Mypage/index'
import ReceivingTray from '../components/pages/ReceivingTray'
import { accountRoute } from './accountRoute'
import { constants } from '../constants'
import SendTray from '../components/pages/SendTray'

const { PATH } = constants.LOCATION

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: PATH.HOME,
        element: <Home />,
      },
      {
        path: PATH.MY_PAGE,
        element: <Mypage />,
        errorElement: <NotFound />,
      },
      {
        path: PATH.RECEIVING_TRAY,
        element: <ReceivingTray />,
        errorElement: <NotFound />,
      },
      {
        path: PATH.SEND_TRAY,
        element: <SendTray />,
        errorElement: <NotFound />,
      },
    ],
  },

  ...accountRoute,
])
