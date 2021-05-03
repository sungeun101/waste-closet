import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import SearchBar from '../components/SearchBar';
import { Carousel } from 'antd';
import { List } from 'antd';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardContainer = styled.div`
  //   background: pink;
`;
const StyledCard = styled(Card.Grid)`
  &:hover {
    cursor: pointer;
  }
`;
const StyledCarousel = styled(Carousel)``;

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const data = [
  {
    title: 'Ant Design Title 1',
    category: '종이',
  },
  {
    title: 'Ant Design Title 2',
    category: '종이',
  },
  {
    title: 'Ant Design Title 3',
    category: '종이',
  },
  {
    title: 'Ant Design Title 4',
    category: '종이',
  },
];

const Home = () => {
  return (
    <Wrapper>
      <SearchBar />

      <CardContainer>
        <StyledCard color="red" style={gridStyle}>
          종이/종이팩
        </StyledCard>
        <StyledCard style={gridStyle}>고철</StyledCard>
        <StyledCard style={gridStyle}>금속캔</StyledCard>
        <StyledCard style={gridStyle}>비닐</StyledCard>
        <StyledCard style={gridStyle}>플라스틱</StyledCard>
        <StyledCard style={gridStyle}>스티로폼</StyledCard>
        <StyledCard style={gridStyle}>불연성 종량제</StyledCard>
        <StyledCard style={gridStyle}>일반 쓰레기</StyledCard>
      </CardContainer>

      <StyledCarousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </StyledCarousel>

      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} />
            <Card.Grid hoverable={false}>{item.category}</Card.Grid>
          </List.Item>
        )}
      />
    </Wrapper>
  );
};

export default Home;
