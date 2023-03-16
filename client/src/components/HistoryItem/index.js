import classNames from 'classnames/bind';
import styles from './HistoryItem.module.scss';

const cx = classNames.bind(styles);

function HistoryItem({ query, answer, inputTokens, outputTokens, openAnswer }) {
   const maxQueryLength = 60;

   const handleOpenAnswer = () => {
      openAnswer(answer);
   };

   return (
      <div className={cx('wrapper')} onClick={handleOpenAnswer}>
         <div className={cx('header')}>
            {query.length > maxQueryLength ? `${query.slice(0, maxQueryLength)}...` : query}
         </div>
         <div className={cx('body')}>
            Input token: {inputTokens}, Output token: {outputTokens}
         </div>
      </div>
   );
}

export default HistoryItem;
