// src/fonts.tsx
import { Global } from "@emotion/react";

export const Fonts = () => (
  <Global
    styles={`
    @font-face {
        font-family: 'Higuen Elegant Serif';
        src: url('/fonts/Higuen-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    `}
  />
);
