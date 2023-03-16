import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import TableWithInput from '~/components/TableWithInput';
import TableWithSchema from '~/components/TableWithSchema';
import TableWithSelect from '~/components/TableWithSelect';
import config from '~/config';
import styles from './NewDatabase.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function NewDatabase() {
   const [dbName, setDbName] = useState('');
   const [dbType, setDbType] = useState('SQL');
   const [dbSchema, setDbSchema] = useState([]);

   let navigate = useNavigate();

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

      if (!dbName || !dbType || !dbSchema) return alert('Please fill all the fields!');

      if (dbSchema.length === 0) return alert('Please add at least one schema!');

      if (dbSchema.some((e) => e.columns.length === 0)) return alert('Please add at least one column in each schema!');

      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.token;

      if (token) {
         const data = {
            name: dbName,
            type: dbType,
            schema: dbSchema,
         };
         axios
            .post(config.api.url + '/database/create', data, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            })
            .then((res) => {
               console.log(res);
               navigate(config.routes.home);
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   const handleCancel = () => {
      navigate(config.routes.home);
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
               <Button outline onClick={handleCancel}>
                  Cancel
               </Button>
               <Button primary onClick={handleSubmit}>
                  Create database
               </Button>
            </div>
         </center>
      </div>
   );
}

export default NewDatabase;
