import React from 'react';
import { Select } from 'antd';

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

const SelectBar = ({ sendOptionValue }) => {
  const handleChange = (value) => {
    sendOptionValue(value);
  };

  return (
    <Select
      defaultValue="# 카테고리"
      onChange={handleChange}
      options={options}
    />
  );
};

export default SelectBar;
