import React from "react";
import styled from "styled-components";
export const FilterSection = ({ children }) => {
  return <StyledFilterSection>{children}</StyledFilterSection>;
};

const StyledFilterSection = styled.div`
  //   background: #e2dede;
  padding: 10px 0;
  border-radius: 10px;
  display: flex;
  gap: 10px;
`;
