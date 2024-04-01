import React, { createContext, useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { RecoilRoot } from 'recoil'

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App
