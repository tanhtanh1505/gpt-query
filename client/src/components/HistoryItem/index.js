import classNames from 'classnames/bind';
import styles from './HistoryItem.module.scss';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function HistoryItem({ query, answer, author, inputTokens, outputTokens, openAnswer }) {
   const navigate = useNavigate();

   const handleOpenAnswer = () => {
      if (author) {
         navigate(`${config.routes.database}/${author}`);
      } else openAnswer(answer);
   };

   return (
      <div className={cx('wrapper')} onClick={handleOpenAnswer}>
         <div className={cx('header')}>{query}</div>
         <div className={cx('body')}>
            Input token: {inputTokens}, Output token: {outputTokens}
         </div>
      </div>
   );
}

export default HistoryItem;
