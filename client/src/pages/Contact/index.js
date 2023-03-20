import classNames from 'classnames/bind';
// import ContactItem from '~/components/ContactItem';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

function Contact() {
   return (
      <div className={cx('wrapper')}>
         <h1>Contacts</h1>
         <p>Have any questions? Reach me on social networks</p>
         {/* <ContactItem facebook body="Tuan Anh" title="Facebook" />
         <ContactItem facebook body="Tuan Anh" title="Facebook" /> */}
      </div>
   );
}

export default Contact;
