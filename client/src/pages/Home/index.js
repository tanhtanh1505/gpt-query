import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import styles from './Home.module.scss';
import axios from 'axios';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Home() {
   const [user, setUser] = useState();

   useEffect(() => {
      axios.get(`${config.api.url}/info`).then((res) => {
         console.log(res);
         setUser(res.data.user);
      });
   });

   const handleGetInfo = () => {
      axios.get(`${config.api.url}/info`).then((res) => {
         console.log(res.data);
         setUser(res.data.user);
      });
   };

   return (
      <div className={cx('wrapper')}>
         <h1>Home</h1>
         {user && <p>{user}</p>}
         <Button onClick={handleGetInfo}>Get info</Button>
         <button>
            <Link to={config.routes.database}>New database</Link>
         </button>
      </div>
   );
}

export default Home;
