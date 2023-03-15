import classNames from 'classnames/bind';
import TableWithInput from '~/components/TableWithInput';
import TableWithSchema from '~/components/TableWithSchema';
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
            <TableWithSchema title="🗃️ Database schema" />
         </center>
      </div>
   );
}

export default NewDatabase;
