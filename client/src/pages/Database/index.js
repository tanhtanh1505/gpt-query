import classNames from 'classnames/bind';
import styles from './Database.module.scss';

const cx = classNames.bind(styles);

function Database() {
   return <div className={cx('wrapper')}>Database</div>;
}

export default Database;
