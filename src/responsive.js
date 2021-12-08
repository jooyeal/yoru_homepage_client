import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (min-width: 768px) {
      ${props}
    }
  `;
};

export const colorMode = (mode) => {
  if (!mode) {
    return css`
      background-color: #f5f5f5;
      color: #212121;
      border-color: #212121;
    `;
  } else {
    return css`
      background-color: #050505;
      color: #fafafa;
      border-color: #fafafa;
    `;
  }
};

export const colorModeProps = (mode) => {};
