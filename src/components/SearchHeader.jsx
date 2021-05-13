import React, { useRef, useEffect } from 'react';
import { Input, Tag } from 'antd';
import styled from 'styled-components';
import { Select } from 'antd';
import { options, tags } from '../constants';
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

const SearchHeader = ({
  searchByCategory,
  searchByName,
  setSelected,
  selected,
  searchValue,
  setSearchValue,
}) => {
  // useEffect(()=>{

  // },[])

  const inputRef = useRef(null);

  const handleSearch = (value) => {
    if (!value) return;
    searchByName(value);
    inputRef.current.focus({
      cursor: 'all',
    });
    setSelected('# 분류별 검색');
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (value) => {
    searchByCategory(value);
    setSelected(value);
    setSearchValue('');
  };

  const handleTagClick = (e) => {
    const {
      target: { innerText },
    } = e;
    setSearchValue(innerText);
    handleSearch(innerText);
    setSelected('# 분류별 검색');
  };

  return (
    <Wrapper>
      <SearchContainer>
        <StyledSearch
          placeholder="이름으로 검색"
          value={searchValue}
          onChange={handleSearchChange}
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
          onChange={handleSelectChange}
        />
      </SearchContainer>

      <TagContainer>
        {tags.map((tag, index) => (
          <StyledTag key={index} color={tag.color} onClick={handleTagClick}>
            {tag.value}
          </StyledTag>
        ))}
      </TagContainer>
    </Wrapper>
  );
};

export default SearchHeader;
