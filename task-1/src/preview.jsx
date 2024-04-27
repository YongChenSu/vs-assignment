import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import envConst from '../environment';
import * as ViewSonicAssignments from './index';

function Preview() {
  const componentsRouter = [
    {
      path: 'ViewSonic-Assignments-Task-1-ResizableEditor',
      component: ViewSonicAssignments.ResizableEditor,
      id: 'ViewSonic-Assignments-Task-1-ResizableEditor',
    },
  ];
  return (
    <BrowserRouter>
      <Suspense fallback={<>...Loading</>}>
        <Routes>
          {componentsRouter.map(router => (
            <Route
              exact
              path={`/${router.path}`}
              element={<router.component />}
              key={router.path}
            />
          ))}
          <Route
            path="/"
            element={
              <div>
                {componentsRouter.map(({ path, id }) => {
                  return (
                    <div key={id}>
                      <Link to={`/${path}`}>{path}</Link>
                    </div>
                  );
                })}
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Preview />);

if (module.hot) {
  module.hot.accept();
}

document.title = envConst.TAB_TITLE;
