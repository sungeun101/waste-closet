import React, { useRef } from 'react';
import 'antd/dist/antd.css';
import { StyledSearch } from '../pages/QnA.elements';

const SearchBar = () => {
  const inputRef = useRef(null);

  const onSearch = (value) => {
    console.log(value);
    inputRef.current.focus({
      cursor: 'all',
    });
  };

  return (
    <StyledSearch
      placeholder="이름으로 검색"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      ref={inputRef}
    />
  );
};

export default SearchBar;
