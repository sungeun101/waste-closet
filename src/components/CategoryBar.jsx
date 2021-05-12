import React, { useEffect } from 'react';
import { Button, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;
const StyledSelect = styled(Select)`
  width: 100%;
  margin-right: 1rem;
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

const CategoryBar = ({ selected, setSelected, selectedOption }) => {
  useEffect(() => {
    setSelected('# 카테고리');
  }, []);

  const handleChange = (value) => {
    selectedOption(value);
    setSelected(value);
  };

  const clearSelect = () => {
    setSelected('# 카테고리');
  };

  return (
    <Wrapper>
      <StyledSelect
        value={selected}
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
