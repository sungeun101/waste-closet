import styled from 'styled-components';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button,
  Spin,
  Pagination,
  Popconfirm,
  message,
  Collapse,
} from 'antd';
const { Search } = Input;

export const StyledSearch = styled(Search)`
  margin-top: 1.5rem;
`;
export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;
export const StyledButton = styled(Button)`
  margin-left: 0.5rem;
`;
export const StyledCollapse = styled(Collapse)`
  margin-top: 1rem;
`;
export const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1.5rem;
`;
export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledConfirm = styled(Popconfirm)`
  margin-left: 0.5rem;
`;
export const StyledPagination = styled(Pagination)`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
