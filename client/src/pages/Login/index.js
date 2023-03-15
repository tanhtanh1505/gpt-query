import classNames from 'classnames/bind';
import Button from '~/components/Button';
import config from '~/config';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
   return (
      <div className={cx('wrapper')}>
         Login Page
         <Button primary href={`${config.api.url}/auth/google`}>
            Login
         </Button>
      </div>
   );
}

export default Login;
