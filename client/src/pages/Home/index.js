import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import config from '~/config';
import styles from './Home.module.scss';
import Button from '~/components/Button';
import axios from 'axios';
import DatabaseItem from '~/components/DatabaseItem';
import HistoryItem from '~/components/HistoryItem';

const cx = classNames.bind(styles);

function Home() {
   const [user, setUser] = useState();
   const [databases, setDatabases] = useState([]);
   const [history, setHistory] = useState([]);

   useEffect(() => {
      const theUser = localStorage.getItem('user');
      if (theUser && !theUser.includes('undefined')) {
         setUser(JSON.parse(theUser));

         axios
            .get(`${config.api.url}/database`, {
               headers: {
                  Authorization: `Bearer ${JSON.parse(theUser).token}`,
               },
            })
            .then((res) => {
               setDatabases(res.data.databases);

               const tempHistory = [];
               res.data.databases.forEach((db) => {
                  if (db.queries && db.queries.length > 0) {
                     tempHistory.push(...db.queries);
                  }
               });
               setHistory(tempHistory);
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
               <DatabaseItem
                  key={db._id}
                  name={db.name}
                  type={db.type}
                  time={db.queries?.length}
                  to={`${config.routes.database}/${db._id}`}
               />
            ))}

         <div className={cx('new-btn')}>
            <Button outline to={config.routes.database} small>
               New database
            </Button>
            <Button primary to={config.routes.importDatabase} small>
               Import database
            </Button>
         </div>
         <h2 className={cx('history')}>History</h2>
         {history &&
            history.length > 0 &&
            history.map((query, index) => (
               <HistoryItem
                  query={query.question}
                  answer={query.answer}
                  inputTokens={query.question.length}
                  outputTokens={query.answer.length}
                  key={index}
                  author={query.author}
               />
            ))}
      </div>
   );
}

export default Home;
