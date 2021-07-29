import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

//components
import CustomSnackbar from 'components/core/CustomSnackbar';

// route
import { renderRoutes } from 'react-router-config';

// components
import Header from './header';

// hook
import { useHeaderHook } from './useHeaderHook';

//util
import { checkAuth, getAccessToken } from 'util/check-auth';

//context
import { useAppValue } from 'context/app';

function Layout(props) {
    useHeaderHook()

    const { route: { routes } } = props;

    const [{ snackbar }, dispatch] = useAppValue();

    const handleClose = () => {
        dispatch({ type: "closeSnackBar" });
    }

    return (
        <React.Fragment>
            {checkAuth() ? <Header /> : null}
            {renderRoutes(routes)}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbar.show}
                autoHideDuration={6000}
                onClose={handleClose}>
                <CustomSnackbar
                    onClose={handleClose}
                    variant={snackbar.varient}
                    message={snackbar.message}
                />
            </Snackbar>

        </React.Fragment>
    )
}

export default Layout;