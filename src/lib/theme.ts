import { ThemeConfig } from 'antd';

export const locmaisTheme: ThemeConfig = {
  token: {
    colorPrimary: '#127184', // Teal/Dark Cyan from logo
    colorInfo: '#f7b718', // Yellow/Gold mapped to Info
    colorTextBase: '#595959',
    borderRadius: 6,
    fontFamily: 'inherit',
  },
  components: {
    Layout: {
      headerBg: '#127184', // Primary color for header
      headerColor: '#ffffff',
    },
    Button: {
      colorPrimary: '#f7b718', // Yellow for primary buttons, better contrast 
      colorPrimaryHover: '#e5a50c',
      colorPrimaryActive: '#cf940a',
    }
  }
};
