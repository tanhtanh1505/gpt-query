import classNames from 'classnames/bind';
import styles from './Database.module.scss';

const cx = classNames.bind(styles);

function Database({ id }) {
   return <div className={cx('wrapper')}>Database wit ID</div>;
}

export default Database;
