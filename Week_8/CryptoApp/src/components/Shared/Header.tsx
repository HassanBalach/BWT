import { Button, Menu, Typography, Avatar } from "antd"
import {BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined} from '@ant-design/icons'
import { Link } from "react-router-dom"
import icon from '/cryptocurrency.png'
import { useEffect, useState } from "react"




const Header = () => {

  const [activeMenu , setActiveMenu] = useState(true)
  const [screenSize , setScreenSize] = useState(Number)

  useEffect(()=>{

    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return ()=> window.removeEventListener('resize', handleResize)

  },[])



  useEffect(()=>{
    if(screenSize &&  screenSize <= 800){
      setActiveMenu(false)
    }else{
      setActiveMenu(true)
    }
  },[screenSize])

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title className="logo">
          Cryptoverse
        </Typography.Title>
        <Button className="menu-control-container" onClick={()=>setActiveMenu(!activeMenu)} ><MenuOutlined /></Button>

      </div>
      {activeMenu && (

            <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/">
              Home
              </Link>
            </Menu.Item>

            <Menu.Item icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">
              Cryptocurrencies
              </Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
              <Link to="/news">
              News
              </Link>
            </Menu.Item>
            </Menu>
      )}
     
    </div>
  )
}

export default Header
