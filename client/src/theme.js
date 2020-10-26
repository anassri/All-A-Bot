import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: '#BF66B2',
            main: '#914A84',
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
            default: '#914A84'
        }
    },
})

export default theme;