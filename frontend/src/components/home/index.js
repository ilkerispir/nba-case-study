import React, { useState, useEffect } from 'react';
import { Form, Layout, Select, Space, Input, Button, Tag, notification, Image } from 'antd';
import { Table } from "ant-table-extensions";
import { SearchOutlined, FileExcelOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import teams from '../../config/teams';

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
      console.log("sdaasds");
      setstate(
        teams.map(row => ({
          key: row.teamId,
          team: row.teamName,
          win: 0,
          lose: 0,
        }))
      );

      console.log(teams);
      var genres = [];
    } catch (err) {
      console.log(err.message);
    }
  }

  function genresChange(value) {
    genreSet(value);
  }

  async function search() {
    try {
      if (!genre) return openNotification("warning", "Search Error!", "Please select the genre of the song.");

      await getTracks(genre);
    } catch (err) {
      console.log(err.message);
    }
  }

  const getTracks = async (genre) => {
    axios.post(`/api/top-tracks-by-artist`, {
      genre: genre,
    }).then(
      res => {
        artistSet(res.data[0].artists[0].name);
        setstate(
          res.data.map(row => ({
            key: row.id,
            image: row.album.images[0].url,
            title: row.name,
            artist: row.artists[0].name,
            album: row.album.name,
            play: row.preview_url
          }))
        );
      }
    );
  }

  const openNotification = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
      placement: "topLeft"
    });
  };

  const columns = [
    {
      title: "Team",
      dataIndex: "team"
    },
    {
      title: "Win",
      dataIndex: "win"
    },
    {
      title: "Lose",
      dataIndex: "lose"
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
            />
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default AppHome;