import React, { Fragment, useState } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'

interface Props {
  children: JSX.Element
}

const MainLayout = (props: Props) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const handleSideBarAction = () => setSideBarOpen(prev => !prev);
  return (
    <Fragment>
      <Header handleSideBarAction={handleSideBarAction} />
      <SideBar open={sideBarOpen} handleSideBarAction={handleSideBarAction} />
      <div>
        {props.children}
      </div>
    </Fragment>
  )
}

export default MainLayout