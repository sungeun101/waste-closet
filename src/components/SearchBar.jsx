import React, { useRef } from 'react';
import { Input, Tag } from 'antd';
import styled from 'styled-components';
import { Select } from 'antd';
const { Search } = Input;

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
`;
const StyledSearch = styled(Search)`
  margin-right: 1rem;
`;
const StyledSelect = styled(Select)`
  width: 10.5em;
`;
const TagContainer = styled.div`
  margin-top: 0.5rem;
`;
const StyledTag = styled(Tag)`
  &:hover {
    cursor: pointer;
  }
`;
const options = [
  { value: '종이/종이팩' },
  { value: '고철' },
  { value: '금속캔' },
  { value: '비닐' },
  { value: '플라스틱' },
  { value: '스티로폼' },
  { value: '불연성종량제' },
  { value: '일반쓰레기' },
];

const SearchBar = ({
  searchByCategory,
  searchByName,
  setSelected,
  selected,
}) => {
  const inputRef = useRef(null);

  const handleSearch = (value) => {
    searchByName(value);
    inputRef.current.focus({
      cursor: 'all',
    });
  };

  const handleChange = (value) => {
    searchByCategory(value);
    setSelected(value);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <StyledSearch
          placeholder="이름으로 검색"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          ref={inputRef}
        />
        <StyledSelect
          value={selected}
          options={options}
          size="large"
          onChange={handleChange}
        />
      </SearchContainer>

      <TagContainer>
        <StyledTag color="red">빨대</StyledTag>
        <StyledTag color="volcano">수건</StyledTag>
        <StyledTag color="orange">전단지</StyledTag>
        <StyledTag color="gold">gold</StyledTag>
        <StyledTag color="lime">lime</StyledTag>
        <StyledTag color="magenta">magenta</StyledTag>
        <StyledTag color="green">green</StyledTag>
        <StyledTag color="cyan">cyan</StyledTag>
        <StyledTag color="blue">blue</StyledTag>
        <StyledTag color="geekblue">geekblue</StyledTag>
        <StyledTag color="purple">purple</StyledTag>
      </TagContainer>
    </Wrapper>
  );
};

export default SearchBar;
