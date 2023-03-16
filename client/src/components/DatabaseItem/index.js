import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './DatabaseItem.module.scss';

const cx = classNames.bind(styles);

function DatabaseItem({ name, type, time, to }) {
   return (
      <Link to={to}>
         <div className={cx('wrapper')}>
            <div className={cx('header')}>{name}</div>
            <div className={cx('body')}>
               {type}, {time} queries
            </div>
         </div>
      </Link>
   );
}

export default DatabaseItem;
