import React from 'react';
import { Layout } from 'antd';

import './App.css';
import 'antd/dist/antd.css';

import AppHeader from './components/common/header';
import AppFooter from './components/common/footer';

import AppHome from './views/home';

const { Header, Content, Footer } = Layout;

const App = (props) => {
  return (
    <Layout className="mainLayout">
      <Header>
        <AppHeader />
      </Header>
      <Content>
        <AppHome />
      </Content>
      <Footer>
       <AppFooter />
      </Footer>
    </Layout>
  );
}

export default App;