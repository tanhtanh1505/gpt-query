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
import { v4 as uuid } from 'uuid';

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
      setDbSchema(dbSchema);
   };

   const handleSubmit = () => {
      console.log('Info');
      console.log(dbName);
      console.log(dbType);
      console.log(dbSchema);

      if (!dbName || !dbType || !dbSchema) return alert('Please fill all the fields!');

      const tempDbSchema = [];
      if (dbSchema) {
         for (let i = 0; i < dbSchema.length; i++) {
            const schema = dbSchema[i];
            if (!schema.name || schema.name === '') continue;
            const tempCols = schema.columns.filter((e) => e.name && e.name !== '');
            schema.columns = tempCols;
            tempDbSchema.push(schema);
         }
      }

      if (tempDbSchema.length === 0) return alert('Please add at least one schema!');

      if (tempDbSchema.some((e) => e.columns.length === 0))
         return alert('Please add at least one column in each schema!');

      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (token) {
         //save to database
         const data = {
            name: dbName,
            type: dbType,
            schema: tempDbSchema,
         };
         axios
            .post(config.api.url + '/database/create', data, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            })
            .then((res) => {
               console.log(res);
               navigate(`${config.routes.database}/${res.data.database._id}`);
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         //save to local storage
         const databases = JSON.parse(localStorage.getItem('databases')) || [];
         const unique_id = uuid();
         const newDatabase = {
            _id: unique_id,
            name: dbName,
            type: dbType,
            schema: tempDbSchema,
         };
         databases.push(newDatabase);

         localStorage.setItem('databases', JSON.stringify(databases));
         navigate(`${config.routes.database}/${newDatabase._id}`);
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
            <TableWithSchema title="🗃️ Database schema" onChange={handleChangeDbSchema} data={dbSchema} />

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
