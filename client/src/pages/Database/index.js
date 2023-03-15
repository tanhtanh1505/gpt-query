import classNames from 'classnames/bind';
import styles from './Database.module.scss';

const cx = classNames.bind(styles);

function Database() {
   const id = window.location.pathname.split('/')[2];
   return <div className={cx('wrapper')}>Database with {id}</div>;
}

export default Database;
