import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import config from '~/config';
import styles from './QueryAnswer.module.scss';

const cx = classNames.bind(styles);

function QueryAnswer({ id, body }) {
   useEffect(() => {
      //if id, get data from server
      const theUser = localStorage.getItem('user');

      if (id) {
         axios
            .get(`${config.api.url}/query/${id}`, {
               headers: { Authorization: `Bearer ${theUser.token}` },
            })
            .then((res) => {
               console.log(res.data);
            });
      }
   }, [id]);

   return (
      <div className={cx('wrapper')}>
         <p className={cx('body')}>{body}</p>
      </div>
   );
}

export default QueryAnswer;
