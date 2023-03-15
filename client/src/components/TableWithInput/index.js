import classNames from 'classnames/bind';
import Table from '../Table';
import styles from './TableWithInput.module.scss';

const cx = classNames.bind(styles);

function TableWithInput({ icon, title, textInput }) {
   return (
      <Table icon={icon} title={title}>
         <center className={cx('wrapper')}>
            <input className={cx('options')} type="text" placeholder={textInput} />
         </center>
      </Table>
   );
}

export default TableWithInput;
