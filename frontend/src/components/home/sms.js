import React, {useState} from 'react';
import { Layout, Select, Space, Input, Button, notification } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import PhoneInput from 'react-phone-input-2'
import axios from 'axios';

import 'antd/dist/antd.css';
import 'react-phone-input-2/lib/style.css'

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const AppSms = () => {
  const [langDisabled, langSetDisabled] = useState(false);
  const [campDisabled, campSetDisabled] = useState(false);
  const [tempDisabled, tempSetDisabled] = useState(false);
  const [buttonDisabled, buttonSetDisabled] = useState(true);
  const [smsType, smsSetType] = useState("");
  const [smsText, smsSetText] = useState("");
  const [smsTo, smsSetTo] = useState("");
  const [langOptions, langOptionsSet] = useState([]);
  const [lang, langSet] = useState("");
  const [camp, campSet] = useState("");
  const [temp, tempSet] = useState("");
  const [campOptions, campOptionsSet] = useState([]);
  const [tempOptions, tempOptionsSet] = useState([]);
  const [inputValue, inputValueSet] = useState("");
  const [toValue, toValueSet] = useState("");

  const openNotification = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
      placement: "topLeft"
    });
  };

  return (
    <Content>
      <div className="child-header" align="center">
        <Space>
          <PhoneInput
            onlyCountries={['ro', 'md', 'ru']}
            country={'ro'}
            value={toValue}
          />
          
          <Select
            style={{ width: 200 }}
            placeholder="SMS Type"
          >
            <Option value="Automatic">Automatic</Option>
            <Option value="Manuel">Manuel</Option>
          </Select>

          <Select
            style={{ width: 200 }}
            placeholder="Language"
            disabled={!langDisabled}
            options= {langOptions}
          >
          </Select>

          <Select
            style={{ width: 200 }}
            placeholder="Campaign"
            disabled={!campDisabled}
            options= {campOptions}
          >
          </Select>
          
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="SMS Template"
            disabled={!tempDisabled}
            options= {tempOptions}
          >
          </Select>
        </Space>

        <div className="child-body" align="center">
          <TextArea 
          rows={19}
          showCount 
          maxLength={1000}
          value={inputValue}
          size="large"     
          />
        </div>

        <div className="child-body" align="center">
          <Button 
          disabled={!buttonDisabled} 
          type="primary" 
          shape="round" 
          icon={<SendOutlined />} 
          size="large"
          >
            Send
          </Button>
        </div>
      </div>
    </Content> 
  );
};

export default AppSms;