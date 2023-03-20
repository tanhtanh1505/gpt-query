import config from '~/config';

// Layouts
import { ContentOnly } from '~/layouts';

// Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Home from '~/pages/Home';
import Contact from '~/pages/Contact';
import Database from '~/pages/Database';
import NewDatabase from '~/pages/NewDatabase';
import ImportDatabase from '~/pages/ImportDatabase';

// Public routes
const publicRoutes = [
   { path: config.routes.login, component: Login, layout: ContentOnly },
   { path: config.routes.register, component: Register, layout: ContentOnly },
   { path: config.routes.home, component: Home },
   { path: config.routes.contacts, component: Contact },
   { path: config.routes.database, component: NewDatabase },
   { path: config.routes.importDatabase, component: ImportDatabase },
   { path: `${config.routes.database}/:id`, component: Database },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
