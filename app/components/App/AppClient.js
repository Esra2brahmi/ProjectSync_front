import React from 'react';
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AppLayout from './../../layout/default';
import { RoutedContent } from './../../routes';

const basePath = process.env.BASE_PATH || '/';

const AppClient = () => {
    return (
        <Router basename={ basePath }>
            <Toaster position="top-right" reverseOrder={false} /> 
            <AppLayout>
                <RoutedContent />
            </AppLayout>
        </Router>
    );
}

export default hot(module)(AppClient);