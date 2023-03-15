import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';
import TableWithInput from '~/components/TableWithInput';
import TableWithSchema from '~/components/TableWithSchema';
import TableWithSelect from '~/components/TableWithSelect';
import styles from './NewDatabase.module.scss';

const cx = classNames.bind(styles);

function NewDatabase() {
   const [dbName, setDbName] = useState('');
   const [dbType, setDbType] = useState('');
   const [dbSchema, setDbSchema] = useState([]);

   const handleChangeDbName = (dbName) => {
      setDbName(dbName);
   };

   const handleChangeDbType = (dbType) => {
      setDbType(dbType);
   };

   const handleChangeDbSchema = (dbSchema) => {
      if (dbSchema) {
         const tempDbSchema = [];
         for (let i = 0; i < dbSchema.length; i++) {
            const schema = dbSchema[i];
            if (!schema.name || schema.name === '') continue;
            const tempCols = schema.columns.filter((e) => e.name && e.name !== '');
            schema.columns = tempCols;
            tempDbSchema.push(schema);
         }
         setDbSchema(tempDbSchema);
      }
   };

   const handleSubmit = () => {
      console.log('Info');
      console.log(dbName);
      console.log(dbType);
      console.log(dbSchema);
   };

   return (
      <div className={cx('wrapper')}>
         <center>
            <p className={cx('title')}>Create new database</p>
            <TableWithInput title="📝 Database name" textInput="Database name" onChange={handleChangeDbName} />
            <TableWithSelect
               title="🔌 Database type"
               options={['SQL', 'MySQL', 'NoSQL']}
               onChange={handleChangeDbType}
            />
            <TableWithSchema title="🗃️ Database schema" onChange={handleChangeDbSchema} />

            <div className={cx('action-buttons')}>
               <Button outline>Cancel</Button>
               <Button primary onClick={handleSubmit}>
                  Create database
               </Button>
            </div>
         </center>
      </div>
   );
}

export default NewDatabase;
