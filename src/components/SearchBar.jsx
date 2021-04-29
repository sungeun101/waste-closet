import React, { useRef } from 'react';
import 'antd/dist/antd.css';
// SearchBar를 아예 QnA에 포함시키거나 styled를 이 컴포넌트 안에서 처리하는게 일관성 있을거 같아요!
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
