import React, { useState, useEffect } from 'react';
import { Form, Layout, Select, Space, Input, Button, Tag, notification, Image } from 'antd';
import { Table } from "ant-table-extensions";
import { SearchOutlined, FileExcelOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import players from '../../config/players';

import 'antd/dist/antd.css';
import 'react-phone-input-2/lib/style.css'

const { Content } = Layout;

const AppHome = () => {
  const [form] = Form.useForm();
  const [state, setstate] = useState([]);
  const [genre, genreSet] = useState('');
  const [genresOptions, genresOptionsSet] = useState([]);
  const [artist, artistSet] = useState('');

  useEffect(async () => {
    getList();
  }, []);

  async function getList() {
    try {
      var list = await axios({
        url: 'http://localhost:8080/api/players',
        method: "POST"
      });

      setstate(
        list.data.map(row => ({
          key: row.playerId,
          name: row.firstName,
          surname: row.lastName,
          ppg: 0,
          rpg: 0,
          apg: 0
        }))
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Surname",
      dataIndex: "surname"
    },
    {
      title: "PPG",
      dataIndex: "ppg"
    },
    {
      title: "RPG",
      dataIndex: "rpg"
    },
    {
      title: "APG",
      dataIndex: "apg"
    }
  ];

  return (
    <Content>
      <div className="child-header" align="center">

        <div className="child-body" align="center">
          <Form form={form} component={false}>
            <Table
              bordered
              dataSource={state}
              columns={columns}
              rowClassName="editable-row"
              searchable
              searchableProps={{
                inputProps: {
                  placeholder: "Search this table...",
                  prefix: <SearchOutlined />,
                },
              }}
              exportable
              exportableProps={{
                showColumnPicker: true,
                fileName: "song-list",
                btnProps: {
                  type: "success",
                  icon: <FileExcelOutlined />,
                  children: <span>Export to CSV</span>,
                },
              }}
              pagination={{ 
                pageSize: 6 
              }}
            />
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default AppHome;