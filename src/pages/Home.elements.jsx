import styled from 'styled-components';
import { Button, Popconfirm, Pagination } from 'antd';

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;
export const StyledButton = styled(Button)`
  margin-left: 0.5rem;
`;
export const StyledConfirm = styled(Popconfirm)``;

export const StyledPagination = styled(Pagination)`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
