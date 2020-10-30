import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: '#BF66B2',
            main: '#9B4486',
            dark: '#562D50',
            contrastText: '#E8E8E8',
        },
        secondary: {
            light: '#D7E5C6',
            main: '#B5C4A5',
            dark: '#7C8472',
            contrastText: '#282828',
        },
        background: {
            paper: '#212121',
            default: '#9B4486'
        }
    },
})

export default theme;