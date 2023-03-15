import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import config from '~/config';
import Menu, { MenuItem } from './Menu';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
   return (
      <aside className={cx('wrapper')}>
         <Menu>
            <div className={cx('logo')}>🤖 GPT Query</div>
            <MenuItem title="Home" to={config.routes.home} />
            <MenuItem title="Contacts" to={config.routes.contacts} />
            <MenuItem title="Logout" to={config.routes.login} />
            <p className={cx('title')}>Databases</p>
            <MenuItem title="Test database" to={`${config.routes.database}/test`} />
            <p className={cx('title')}>Social links</p>
            <MenuItem title="Facebook" to={config.routes.socials} icon={<FontAwesomeIcon icon={faHome} />} />
         </Menu>
      </aside>
   );
}

export default Sidebar;
