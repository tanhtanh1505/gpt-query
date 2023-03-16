import classNames from 'classnames/bind';
import Table from '../Table';
import styles from './TableWithSelect.module.scss';

const cx = classNames.bind(styles);

function TableWithSelect({ icon, title, value, options, onChange }) {
   //const options = ['One', 'Two', 'Three', 'Four', 'Five'];
   const onOptionChangeHandler = (event) => {
      console.log('User Selected Value - ', event.target.value);
      if (onChange) onChange(event.target.value);
   };

   return (
      <Table icon={icon} title={title ? title : '🔌 Database type'}>
         <center className={cx('wrapper')}>
            <select className={cx('options')} onChange={onOptionChangeHandler} value={value}>
               {options.map((option, index) => {
                  return <option key={index}>{option}</option>;
               })}
            </select>
         </center>
      </Table>
   );
}

export default TableWithSelect;
