import classNames from 'classnames/bind';
import styles from './TableItem.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TableItem() {
   const [tableName, setTableName] = useState();
   const [columns, setColumns] = useState([]);

   const addColumn = () => {
      setColumns([...columns, { name: '', type: '' }]);
      console.log('addColumn', columns);
   };

   const removeEmptyColumns = (index) => {
      // remove empty columns except last
      if (index !== columns.length - 1 && columns[index].name === '') {
         columns.splice(index, 1);
         setColumns([...columns]);
      }
   };

   const handleChangeColumnName = (index) => (event) => {
      columns[index].name = event.target.value;
      if (index === columns.length - 1) {
         addColumn();
      } else setColumns([...columns]);
   };

   const handleChangeTableName = (event) => {
      setTableName(event.target.value);
      if (columns.length < 1) setColumns([{ name: '', type: '' }]);
   };

   return (
      <div className={cx('wrapper')}>
         <input
            className={cx('name-table')}
            placeholder="Table name"
            onChange={handleChangeTableName}
            value={tableName}
         />
         <div className={cx('list-columns')}>
            {columns &&
               columns.map((column, index) => {
                  return (
                     <div key={index} className={cx('column')}>
                        <input
                           className={cx('name-column')}
                           placeholder="Column name"
                           onChange={handleChangeColumnName(index)}
                           onBlur={() => removeEmptyColumns(index)}
                           value={column.name}
                        />
                        <select className={cx('type-column')}>
                           <option>String</option>
                           <option>Number</option>
                           <option>Boolean</option>
                        </select>
                     </div>
                  );
               })}
         </div>
      </div>
   );
}

export default TableItem;
