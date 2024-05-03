import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
:root { 
  --yellow: #ffd700;
  --blue: #316cb3;
  --card-color: #ffcb05;
  --blue-dark:#16529b;
  --white: #ffff;
  --gray: #9c9c9c;
}

* { 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html{
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  font-style: normal;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  line-height: 1.5;
  scroll-behavior: smooth;
}


button {
  cursor:pointer;
}
`