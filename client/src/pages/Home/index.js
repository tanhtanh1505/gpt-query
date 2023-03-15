import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import config from '~/config';
import styles from './Home.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Home() {
   const [user, setUser] = useState();

   useEffect(() => {
      const theUser = localStorage.getItem('user');

      if (theUser && !theUser.includes('undefined')) {
         setUser(JSON.parse(theUser));
      }
   }, []);

   return (
      <div className={cx('wrapper')}>
         <h1>Home</h1>
         {user?.email ? <p>You are loged as {user?.email}</p> : <p>You are logged as Guest</p>}
         <Button primary to={config.routes.database}>
            New database
         </Button>
      </div>
   );
}

export default Home;
