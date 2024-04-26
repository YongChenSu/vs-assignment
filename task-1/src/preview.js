import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
    Routes, Route, BrowserRouter, Link,
} from 'react-router-dom';
import envConst from '../environment';
import * as ViewSonicAssignments from './index';

const Preview = () => {
    const componentsRouter = [
        {
            path: 'ViewSonic-Assignments',
            component: ViewSonicAssignments.TaskOne,
        },
    ];
    return (
        <BrowserRouter>
            <Suspense fallback={<>...Loading</>}>
                <Routes>
                    {componentsRouter.map((router) => (
                        <Route
                            exact
                            path={`/${router.path}`}
                            element={<router.component {...router.props} />}
                            key={router.path}
                        />
                    ))}
                    <Route
                        path="/"
                        element={(
                            <div>
                                {componentsRouter.map((router, index) => {
                                    return (
                                        <div key={index}>
                                            <Link to={`/${router.path}`}>{router.path}</Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Preview />);

if (module.hot) {
    module.hot.accept();
}

document.title = envConst.TAB_TITLE;
