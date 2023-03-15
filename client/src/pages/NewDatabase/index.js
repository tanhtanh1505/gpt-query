import classNames from 'classnames/bind';
import Table from '~/components/Table';
import TableWithInput from '~/components/TableWithInput';
import TableWithSelect from '~/components/TableWithSelect';
import styles from './NewDatabase.module.scss';

const cx = classNames.bind(styles);

function NewDatabase({ id }) {
   return (
      <div className={cx('wrapper')}>
         <center>
            <p className={cx('title')}>Create new database</p>
            <TableWithInput title="📝 Database name" textInput="Database name" />
            <TableWithSelect title="🔌 Database type" options={['SQL', 'MySQL', 'NoSQL']} />
            <Table title="🗃️ Database schema" body={<div>Name</div>} />
         </center>
      </div>
   );
}

export default NewDatabase;
