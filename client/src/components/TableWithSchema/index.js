import classNames from 'classnames/bind';
import Table from '../Table';
import TableItem from './components/TableItem';
import styles from './TableWithSchema.module.scss';

const cx = classNames.bind(styles);

function TableWithSchema({ icon, title, options }) {
   return (
      <Table icon={icon} title={title}>
         <center className={cx('wrapper')}>
            <TableItem />
            <TableItem />
         </center>
      </Table>
   );
}

export default TableWithSchema;
