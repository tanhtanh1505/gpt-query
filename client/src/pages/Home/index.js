import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import config from '~/config';
import styles from './Home.module.scss';
import Button from '~/components/Button';
import axios from 'axios';
import DatabaseItem from '~/components/DatabaseItem';

const cx = classNames.bind(styles);

function Home() {
   const [user, setUser] = useState();
   const [databases, setDatabases] = useState([]);

   useEffect(() => {
      const theUser = localStorage.getItem('user');
      if (theUser && !theUser.includes('undefined')) {
         setUser(JSON.parse(theUser));

         axios
            .get(`${config.api.url}/database/name`, {
               headers: {
                  Authorization: `Bearer ${JSON.parse(theUser).token}`,
               },
            })
            .then((res) => {
               setDatabases(res.data.databases);
            });
      } else {
         // get databases in local storage
         const dbs = localStorage.getItem('databases');
         if (dbs) setDatabases(JSON.parse(dbs));
      }
   }, []);

   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('home')}>Home</h1>
         <div className={cx('notification')}>
            <p>
               Hey there 🥷 {user?.firstName}, just a heads up - our OpenAI token is like the office coffee pot, we all
               share it but sometimes it runs out, and there's no potluck to save us. So to avoid a caffeine-deprived
               tragedy, we suggest you login with Google and set up your own personal token.
            </p>
         </div>
         <h2 className={cx('databases')}>Databases</h2>
         {databases &&
            databases.map((db) => (
               <DatabaseItem key={db._id} name={db.name} type={db.type} to={`${config.routes.database}/${db._id}`} />
            ))}

         <div className={cx('new-btn')}>
            <Button outline to={config.routes.database} small>
               New database
            </Button>
         </div>
         <h2 className={cx('history')}>History</h2>
      </div>
   );
}

export default Home;
