import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { blue, pink, grey } from '@material-ui/core/colors';


export default createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink
    },
    zIndex: {
        menu: 0,
        appBar: 0,
        leftNavOverlay: 0,
        leftNav: 0,
        dialogOverlay: 0,
        dialog: 0,
        layer: 0,
        popover: 0,
        snackbar: 0,
        tooltip: 0
    },
    overrides: {
        MuiTypography: {
            root: {
                fontSize: 13,
                color: grey[900]
            },
            body1: {
                fontSize: 13,
                color: grey[900]
            },
            h5: {
                color: grey[900]
            },
            subtitle2: {

            },
            body: {

            }
        },
        MuiSvgIcon: {
            root: {
                fontSize: 18
            }
        },
        MuiButtonBase: {
            root: {
                fontSize: 13,
                color: grey[900],
                textTransform: 'none',
                padding: 2
            }
        },
        MuiTabs: {
            flexContainer: {
                justifyContent: 'center'
            }
        },
        MuiCssBaseline: {
            '@global': {
                '*': {
                    'scrollbar-width': 'thin',
                },
                '*::-webkit-scrollbar': {
                    width: '6px',
                    height: '6px',
                }
            }
        }
    }

});