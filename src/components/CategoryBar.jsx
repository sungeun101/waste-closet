import React from 'react';
import { Button, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { options } from '../constants';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;
const StyledSelect = styled(Select)`
  width: 100%;
  margin-right: 1rem;
`;

const CategoryBar = ({ category, setCategory, setSelectedOption }) => {
  const handleChange = (value) => {
    setSelectedOption(value);
    setCategory(value);
  };

  const clearSelect = () => {
    setCategory('# 카테고리');
  };

  return (
    <Wrapper>
      <StyledSelect
        value={category}
        onChange={handleChange}
        options={options}
      />
      <Button onClick={clearSelect}>
        <ReloadOutlined />
      </Button>
    </Wrapper>
  );
};

export default CategoryBar;
