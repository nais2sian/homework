import React from 'react';

import {Header} from '../Header';

export const Layout = ({children}: React.PropsWithChildren) => {
    return <div className="container small">
        <Header />
        <main>
            {children}
        </main>
    </div>
};