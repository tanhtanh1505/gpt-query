import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Table from '../Table';
import TableItem from './components/TableItem';
import styles from './TableWithSchema.module.scss';

const cx = classNames.bind(styles);

function TableWithSchema({ icon, title, onChange, data }) {
   const [tableItems, setTableItems] = useState([{ name: '', columns: [{ name: '', type: '' }] }]);

   useEffect(() => {
      if (data) {
         setTableItems(data);
      }
   }, [data]);

   useEffect(() => {
      let existEmpty = false;
      for (let i = 0; i < tableItems.length; i++) {
         if (tableItems[i].name === '') {
            existEmpty = true;
            break;
         }
      }
      if (!existEmpty) {
         setTableItems([...tableItems, { name: '', columns: [{ name: '', type: '' }] }]);
      }
   }, [tableItems]);

   const updateTable = (index) => (value) => {
      tableItems[index] = value;
      setTableItems([...tableItems]);
      if (onChange) onChange(tableItems);
   };

   return (
      <Table icon={icon} title={title ? title : '🗃️ Database schema'}>
         <center className={cx('wrapper')}>
            {tableItems &&
               tableItems.map((tableItem, index) => {
                  return (
                     <TableItem
                        key={index}
                        name={tableItem.name}
                        cols={tableItem.columns}
                        updateData={updateTable(index)}
                     />
                  );
               })}
         </center>
      </Table>
   );
}

export default TableWithSchema;
