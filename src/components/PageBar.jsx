import React from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';

export const StyledPagination = styled(Pagination)`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 필요한 props보다 독립적인 컴포넌트로 만듦으로써 넘겨줘야 할 props가 더 많아져버리면 리팩토링하지 않는게 낫다는 신호
const PageBar = ({ setCurrentPageNumber, totalResults }) => {
  const handlePageChange = (page) => {
    setCurrentPageNumber(page);
  };

  return <StyledPagination onChange={handlePageChange} total={totalResults} />;
};

export default PageBar;
