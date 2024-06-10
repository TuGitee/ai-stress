const theme = {
  chalk: {
    backgroundColor: '#000c',
    titleColor: '#ffffff',
    headerBorderSrc: 'header_border_dark.png'

  },
  vintage: {
    backgroundColor: 'transparent',
    titleColor: '#000000',
    headerBorderSrc: 'header_border_light.png'
  }
}

export function getThemeValue(themeName) {
  return theme[themeName]
}
