import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './HistoryItem.module.scss';

const cx = classNames.bind(styles);

function HistoryItem({ query, inputTokens, outputTokens, to }) {
   return (
      <Link to={to}>
         <div className={cx('wrapper')}>
            <div className={cx('header')}>{query}</div>
            <div className={cx('body')}>
               Input token: {inputTokens}, Output token: {outputTokens}
            </div>
         </div>
      </Link>
   );
}

export default HistoryItem;
