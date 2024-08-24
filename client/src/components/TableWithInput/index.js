import classNames from 'classnames/bind';
import Table from '../Table';
import styles from './TableWithInput.module.scss';

const cx = classNames.bind(styles);

function TableWithInput({ icon, title, textArea, textInput, onChange, onKeyDown }) {
   const handleChangeText = (event) => {
      onChange(event.target.value);
   };
   return (
      <Table icon={icon} title={title}>
         <center className={cx('wrapper')}>
            {textArea ? (
               <textarea
                  className={cx('options')}
                  placeholder={textArea}
                  onChange={handleChangeText}
                  onKeyDown={onKeyDown}
               />
            ) : (
               <input
                  className={cx('options')}
                  type="text"
                  placeholder={textInput}
                  onChange={handleChangeText}
                  onKeyDown={onKeyDown}
               />
            )}
         </center>
      </Table>
   );
}

export default TableWithInput;
