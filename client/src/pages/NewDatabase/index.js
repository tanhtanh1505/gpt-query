import classNames from 'classnames/bind';
import styles from './NewDatabase.module.scss';

const cx = classNames.bind(styles);

function NewDatabase({ id }) {
   return <div className={cx('wrapper')}>New DB</div>;
}

export default NewDatabase;
