import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
   return (
      <div className={cx('wrapper')}>
         <h1>Home</h1>
         <button>
            <Link to={config.routes.database}>New database</Link>
         </button>
      </div>
   );
}

export default Home;
