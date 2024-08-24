import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import config from '~/config';
import styles from './Home.module.scss';
import Button from '~/components/Button';
import axios from 'axios';
import DatabaseItem from '~/components/DatabaseItem';
import HistoryItem from '~/components/HistoryItem';
import { DatabasesContext } from '~/context/DatabaseContext';

const cx = classNames.bind(styles);

function Home() {
   const [user, setUser] = useState();
   const { databases, reloadDatabases } = useContext(DatabasesContext);
   const [history, setHistory] = useState([]);

   useEffect(() => {
      const theUser = localStorage.getItem('user');
      if (theUser && !theUser.includes('undefined')) {
         setUser(JSON.parse(theUser));
         reloadDatabases();
         axios
            .get(`${config.api.url}/database`, {
               headers: {
                  Authorization: `Bearer ${JSON.parse(theUser).token}`,
               },
            })
            .then((res) => {
               const tempHistory = [];
               res.data.databases.forEach((db) => {
                  if (db.queries && db.queries.length > 0) {
                     tempHistory.push(...db.queries);
                  }
               });
               setHistory(tempHistory);
            });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('home')}>Home</h1>
         <div className={cx('notification')}>
            <p>
               Hey there 🥷 {user?.firstName}, just a heads up - our OpenAI token is like the office coffee pot, we all
               share it but sometimes it runs out, and there's no potluck to save us. So to avoid a caffeine-deprived
               tragedy, we suggest you login with Google and contact us when you reach the limit 🚀.
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
