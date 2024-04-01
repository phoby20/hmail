import ForgetPassword from '../../components/pages/Account/ForgetAccount'
import Login from '../../components/pages/Account/Login'
import Logout from '../../components/pages/Account/Logout'
import RegistAccount from '../../components/pages/Account/RegistAccount'
import RegistComplete from '../../components/pages/Account/RegistComplete'
import RegistConfirm from '../../components/pages/Account/RegistConfirm'
import ResetPassword from '../../components/pages/Account/ResetPassword'
import NotFound from '../../components/pages/Error/notFound'
import { constants } from '../../constants'

const { PATH } = constants.LOCATION

export const accountRoute = [
  {
    path: PATH.LOGIN,
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: PATH.LOGOUT,
    element: <Logout />,
    errorElement: <NotFound />,
  },
  {
    path: PATH.REGIST_ACCOUNT,
    element: <RegistAccount />,
    errorElement: <NotFound />,
  },
  {
    path: PATH.REGIST_CONFIRM,
    element: <RegistConfirm />,
    errorElement: <NotFound />,
  },
  {
    path: PATH.FORGET_PASSWORD,
    element: <ForgetPassword />,
    errorElement: <NotFound />,
  },
  {
    path: PATH.RESET_PASSWORD,
    element: <ResetPassword />,
    errorElement: <NotFound />,
  },
  {
    path: PATH.REGIST_COMPLETE,
    element: <RegistComplete />,
    errorElement: <NotFound />,
  },
] as const
