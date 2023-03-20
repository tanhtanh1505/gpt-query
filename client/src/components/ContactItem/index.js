import classNames from 'classnames/bind';
import styles from './ContactItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function ContactItem({ facebook, linkedin, title, body }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('logo')}>{facebook && <img src={images.facebook} alt="fb" />}</div>
         <div>
            <div className={cx('title')}>{title}</div>
            <div className={cx('body')}>{body}</div>
         </div>
      </div>
   );
}

export default ContactItem;
