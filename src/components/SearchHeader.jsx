import React, { useEffect, useState, useRef } from 'react';
import { Input, Tag } from 'antd';
import styled from 'styled-components';
import { Select } from 'antd';
import { options, items } from '../constants';
const { Search } = Input;

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;

  @media screen and (max-width: 48rem) {
    flex-direction: column;
    align-items: normal;
  }
`;
const StyledSearch = styled(Search)`
  margin-right: 1rem;

  @media screen and (max-width: 48rem) {
    order: 2;
    margin-top: 0.5rem;
  }
`;
const StyledSelect = styled(Select)`
  width: 10.5em;

  @media screen and (max-width: 48rem) {
    order: 1;
  }
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
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    shuffleTags(items);
  }, []);

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
    shuffleTags(items);
  };

  const shuffleTags = (array) => {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const selected = array.slice(0, 5);
    setTags(selected);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <StyledSearch
          placeholder="이름으로 검색"
          value={searchValue}
          onChange={handleSearchChange}
          allowClear
          enterButton
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
