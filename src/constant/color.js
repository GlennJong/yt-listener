import { css } from 'styled-components';

export const color = {

  primary: 'hsl(348, 88%, 65%)',
  secondary: 'hsl(340, 83%, 65%)',
  thirdary: 'hsl(334, 77%, 65%)',

  pureBlack: '#000',

  black: {
    dark: 'hsl(246, 19%, 22%)',
    normal: 'hsl(248, 17%, 25%)'
  },

  pureWhite: '#FFF',

  white: {
    dark: 'hsl(204, 86%, 85%)',
    normal: 'hsl(204, 86%, 92%)'
  },
  
  
  dark: '#1b262c',
  button: '#0f4c75',
  text: '#3282b8',
  bright: '#bbe1fa'
}

export const gradient = {
  background: `linear-gradient(0deg, ${color.black.dark} 0%, ${color.black.normal} 100%)`,
  primary: `linear-gradient(45deg, ${color.primary} 0%, ${color.secondary} 50%, ${color.thirdary} 100%)`,
  blue: css`
    background-color: #0093E9;
    background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
  `
}