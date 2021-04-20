import React, { useRef } from 'react';
import { Input, } from 'antd';

const QnaHeader = () => {
    const inputRef = useRef(null);

    const onSearch = value => {
        console.log(value)
        inputRef.current.focus({
            cursor: 'all',
        })
    };

    return (
        <div>
            <Input.Search
                placeholder="이름으로 검색"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                ref={inputRef}
            />
        </div>
    );
};

export default QnaHeader;