import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
//import { Menu, Breadcrumb ,Layout} from 'antd';
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import Sidebar from '../components/Sidebar'
// import { fetchServerStateIfNeeded } from '../actions/serverState'
import 'antd/dist/antd.css'
import '../common/layout.less'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class App extends Component {
  render() {
    const currentMenu = this.props.location.pathname.replace('/','') || 'home';
    return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="home">
            <Link to="/" ><Icon type="home"/>Home</Link>
          </Menu.Item>
          <Menu.Item key="news">
            <Link to="/news" ><Icon type="file-text" />News</Link>
          </Menu.Item>
          <Menu.Item key="counter">
            <Link to="/counter"><Icon type="calculator" />Counter</Link>
          </Menu.Item>
          <Menu.Item key="notes">
            <Link to="/notes"><Icon type="book" />Notes</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about" ><Icon type="info-circle-o" />About</Link>
          </Menu.Item>
          <Menu.Item key="env">
            <Link to="/env" ><Icon type="book" />Environment</Link>
          </Menu.Item>
          <Menu.Item key="6">
              <span>
                <Icon type="global" />
                <span className="nav-text">Map</span>
              </span>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 700 }}>{this.props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
    );
  }

}

export default connect(state => {
  console.log(state)
  return state.server;
})(App)
