import React, { useState } from 'react';
import { Card, Skeleton, Form, Input, Button, notification } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import axios from 'axios';
import { serverUrl } from '../../config';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AppLogin = (props) => {

    const { setIsAuth, setCookie } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const openNotification = (type, title, message) => {
      notification[type]({
        message: title,
        description: message,
        placement: "topLeft"
      });
    };

    const HandleLogin = async function () {
      if (!username) {return openNotification("warning","Login Error", "Username parameter is missing!");}
      if (!password) {return openNotification("warning","Login Error", "Password parameter is missing!");}
      
      setIsLoading(true);

      try {
        const response = await axios({
          url: serverUrl,
          method: "GET",
          params: {
            function: "login",
            email: username,
            password: password
          }
        });

        if(!response.data.login) {
          throw new Error("Email or password is wrong");
        }

        setIsLoading(false);

        const session = await response.data.session;
        setCookie("session", session, { maxAge: 86400 });
        setCookie("email", username, { maxAge: 86400 });
        setIsAuth(true);

        openNotification("info", "Login successed!");
      } catch(error) {
        setIsLoading(false);

        const { response } = error;
        if (response) {
          const { request, ...errorObject } = response; // take everything but 'request'
          console.log(errorObject);
          return openNotification("warning", "Login Error", errorObject.data.message);
        }
        else {
          return openNotification("error", "Login Error", error.message);
        }
      }
    }

    return (
        
      <Card title="Login" bordered={false} style={{ width: 400, margin: "auto", marginTop: 20}}>
        { 
          isLoading ? 
          <div>
            <Skeleton.Input style={{ width: 300, marginBottom: 24 }} active size="default" />
            <Skeleton.Input style={{ width: 300, marginBottom: 24 }} active size="default" />
            <Skeleton.Input style={{ width: 300, marginBottom: 24 }} active size="default" />
            <Skeleton.Input style={{ width: 300, marginBottom: 24  }} active size="default" />
            <Skeleton.Button style={{ width: 60, marginBottom: 24 }} active size="default" />
          </div>
          :
          
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
            >
              <Input onChange={e => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={e => setPassword(e.target.value)} />
            </Form.Item>
            
            <Form.Item {...tailLayout}>
              <Button type="primary" icon={<LoginOutlined />} onClick={e => HandleLogin()}>
                Login
              </Button>
            </Form.Item>
          </Form>
        }
      </Card>
    );
}

export default AppLogin;