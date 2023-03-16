import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './Database.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '~/config';
import Button from '~/components/Button';
import TableWithSchema from '~/components/TableWithSchema';
import TableWithSelect from '~/components/TableWithSelect';
import { dbTypes } from '~/utils/types/dbTypes';

const cx = classNames.bind(styles);

function Database() {
   const id = useParams().id;
   const [dbName, setDbName] = useState();
   const [dbType, setDbType] = useState();
   const [dbSchema, setDbSchema] = useState();

   useEffect(() => {
      const theUser = localStorage.getItem('user');
      if (theUser && !theUser.includes('undefined')) {
         axios
            .get(`${config.api.url}/database/${id}`, {
               headers: { Authorization: `Bearer ${JSON.parse(theUser).token}` },
            })
            .then((res) => {
               const database = res.data.database;
               setDbName(database.name);
               setDbType(database.type);
               setDbSchema(database.schema);
            });
      }
   }, [id]);

   // const handleChangeDbName = (event) => {
   //    setDbName(event.target.value);
   // };

   // const handleChangeDbType = (event) => {
   //    setDbType(event.target.value);
   // };

   const handleChangeDbSchema = (dbSchema) => {
      setDbSchema(dbSchema);
   };

   return (
      <>
         <div className={cx('wrapper')}>
            <h1>{dbName}</h1>
            <div className={cx('button-action')}>
               <Button outline>Delete</Button>
               <Button to={config.routes.home}>Close</Button>
            </div>
            <TableWithSelect value={dbType} options={dbTypes} />
            <TableWithSchema data={dbSchema} onChange={handleChangeDbSchema} />
         </div>
      </>
   );
}

export default Database;
