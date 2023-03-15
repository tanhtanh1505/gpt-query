import classNames from 'classnames/bind';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

function Table({ icon, title, children }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('header')}>
            {icon && <div className={cx('icon')}>{icon}</div>}
            <div className={cx('title')}>{title}</div>
         </div>
         <div className={cx('body')}>{children}</div>
      </div>
   );
}

export default Table;
