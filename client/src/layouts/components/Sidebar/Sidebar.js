import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import { useState, useEffect, useContext } from 'react';
import styles from './Sidebar.module.scss';
import { DatabasesContext } from '~/context/DatabaseContext';

const cx = classNames.bind(styles);

function Sidebar() {
   const [user, setUser] = useState({});
   const { databases } = useContext(DatabasesContext);

   useEffect(() => {
      const theUser = localStorage.getItem('user');
      if (theUser && !theUser.includes('undefined')) {
         setUser(JSON.parse(theUser));
      }
   }, []);

   const logout = () => {
      localStorage.removeItem('user');
   };

   return (
      <aside className={cx('wrapper')}>
         <Menu>
            <div className={cx('logo')}>🤖 GPT Query</div>
            <MenuItem title="Home" to={config.routes.home} />
            <MenuItem title="Contacts" to={config.routes.contacts} />
            <MenuItem title={user?.email ? 'Logout' : 'Login'} onClick={logout} to={config.routes.login} />
            <p className={cx('title')}>Databases</p>
            {databases &&
               databases.map((db) => (
                  <MenuItem key={db._id} title={db.name} to={`${config.routes.database}/${db._id}`} />
               ))}

            <p className={cx('title')}>Social links</p>
            <MenuItem
               to="https://www.linkedin.com/in/tuan-anh-694b82239/"
               title="Tuan Anh"
               icon={<FontAwesomeIcon icon={faLinkedin} />}
            />
         </Menu>
      </aside>
   );
}

export default Sidebar;
