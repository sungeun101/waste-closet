import React, { useRef } from 'react';
import { Select, Input, Tag } from 'antd';
import styled from 'styled-components';

const { Search } = Input;
const { Option } = Select;

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

const SearchBar = () => {
  const inputRef = useRef(null);

  const handleSearch = (value) => {
    console.log(value);
    inputRef.current.focus({
      cursor: 'all',
    });
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
          defaultValue="#분류별 검색"
          onChange={handleChange}
          size="large"
        >
          <Option value="종이/종이팩">종이/종이팩</Option>
          <Option value="고철">고철</Option>
          <Option value="금속캔">금속캔</Option>
          <Option value="비닐">비닐</Option>
          <Option value="플라스틱">플라스틱</Option>
          <Option value="스티로폼">스티로폼</Option>
          <Option value="불연성종량제">불연성종량제</Option>
          <Option value="일반쓰레기">일반쓰레기</Option>
        </StyledSelect>
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
