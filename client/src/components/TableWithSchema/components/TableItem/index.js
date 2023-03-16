import classNames from 'classnames/bind';
import styles from './TableItem.module.scss';

const cx = classNames.bind(styles);

function TableItem({ name, cols, updateData }) {
   let tableName = name;
   let columns = cols;

   const addColumn = () => {
      columns.push({ name: '', type: '' });
   };

   const removeEmptyColumns = (index) => {
      // remove empty columns except last
      if (index !== columns.length - 1 && columns[index].name === '') {
         columns.splice(index, 1);
         updateData({ name: tableName, columns: columns });
      }
   };

   const handleChangeColumnName = (index) => (event) => {
      columns[index].name = event.target.value;
      if (index === columns.length - 1) {
         addColumn();
      }
      updateData({ name: tableName, columns: columns });
   };

   const handleChangeTableName = (event) => {
      tableName = event.target.value;
      if (columns.length < 1) addColumn();
      updateData({ name: tableName, columns: columns });
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
