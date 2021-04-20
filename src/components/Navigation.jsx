import React, { useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [current, setCurrent] = useState('qna')

    const handleClick = e => {
        setCurrent(e.key)
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<MailOutlined />}>
                <Link to="/">품목검색</Link>
            </Menu.Item>
            <Menu.Item key="qna" icon={<AppstoreOutlined />}>
                <Link to="/qna">Q&amp;A</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Navigation;