import React from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';

export const StyledPagination = styled(Pagination)`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageBar = ({ setCurrentPageNumber, totalResults }) => {
  const handlePageChange = (page) => {
    // // 1. current page setting
    // setCurrentPageNumber(page);
    // // 2. api call
    // // const response = await axios.get(baseURL, { params: { page: page } });
    // const response = await Service.getAll({
    //   params: { page: page },
    // });
    // console.log(response);
    // // 3. questions setting
    // setQuestions(response.data.results);

    setCurrentPageNumber(page);
  };

  return <StyledPagination onChange={handlePageChange} total={totalResults} />;
};

export default PageBar;
