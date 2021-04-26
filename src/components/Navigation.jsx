import React, { useState } from 'react';
import { Menu } from 'antd';
import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';

const Navigation = () => {
    const [current, setCurrent] = useState('')

    const handleClick = e => {
        setCurrent(e.key)
        console.log(e)
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<FileSearchOutlined />}>
                <Link to="/">품목검색</Link>
            </Menu.Item>
            <Menu.Item key="qna" icon={<QuestionCircleOutlined />}>
                <Link to="/qna">Q&amp;A</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Navigation;