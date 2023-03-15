import config from '~/config';

// Layouts
import { ContentOnly } from '~/layouts';

// Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Home from '~/pages/Home';
import Contact from '~/pages/Contact';
import Database from '~/pages/Database';

// Public routes
const publicRoutes = [
   { path: config.routes.login, component: Login, layout: ContentOnly },
   { path: config.routes.register, component: Register, layout: ContentOnly },
   { path: config.routes.home, component: Home },
   { path: config.routes.contacts, component: Contact },
   { path: config.routes.database, component: Database },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
