import classNames from 'classnames/bind';
import { useState, useEffect, Fragment } from 'react';
import styles from './Database.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '~/config';
import Button from '~/components/Button';
import TableWithSchema from '~/components/TableWithSchema';
import TableWithSelect from '~/components/TableWithSelect';
import { dbTypes } from '~/utils/types/dbTypes';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import TableWithInput from '~/components/TableWithInput';
import QueryAnswer from '~/components/QueryAnswer';
import Popup from 'reactjs-popup';

const cx = classNames.bind(styles);

function Database() {
   const id = useParams().id;
   const [dbName, setDbName] = useState();
   const [dbType, setDbType] = useState();
   const [dbSchema, setDbSchema] = useState();
   const [query, setQuery] = useState('');
   const [result, setResult] = useState('');
   const [openAnswer, setOpenAnswer] = useState(false);

   const navigate = useNavigate();

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
      } else {
         // get databases in local storage
         const dbs = localStorage.getItem('databases');
         if (dbs) {
            const databases = JSON.parse(dbs);
            const database = databases.find((db) => db._id === id);
            setDbName(database.name);
            setDbType(database.type);
            setDbSchema(database.schema);
         }
      }
   }, [id]);

   // const handleChangeDbName = (event) => {
   //    setDbName(event.target.value);
   // };

   const handleChangeDbType = (value) => {
      setDbType(value);
   };

   const handleChangeDbSchema = (dbSchema) => {
      setDbSchema(dbSchema);
   };

   const handleChangeQuery = (query) => {
      setQuery(query);
   };

   const handleDelete = () => {
      swal({
         title: 'Are you sure?',
         text: 'You will remove this database!',
         icon: 'warning',
         buttons: true,
         dangerMode: true,
      }).then(async (willDelete) => {
         if (willDelete) {
            const msg = await deleteDatabase();
            swal(msg, {
               icon: 'success',
            });
            navigate(config.routes.home);
         }
      });
   };

   const deleteDatabase = async () => {
      const theUser = localStorage.getItem('user');
      if (theUser && !theUser.includes('undefined')) {
         const msg = await axios.delete(`${config.api.url}/database/remove/${id}`, {
            headers: { Authorization: `Bearer ${JSON.parse(theUser).token}` },
         });

         return msg.data.message;
      } else {
         // get databases in local storage
         const dbs = localStorage.getItem('databases');
         if (dbs) {
            const databases = JSON.parse(dbs);
            const database = databases.find((db) => db._id === id);
            const index = databases.indexOf(database);
            databases.splice(index, 1);
            localStorage.setItem('databases', JSON.stringify(databases));
            return 'Database deleted';
         }
      }
   };

   const handleSubmit = () => {
      const theUser = localStorage.getItem('user');
      if (theUser && !theUser.includes('undefined')) {
         if (query === '') {
            swal('You need to write a query!', {
               icon: 'warning',
            });
            return;
         }

         setResult('Loading...');
         setOpenAnswer(true);

         // axios
         //    .get(`${config.api.url}/database/${id}/query?q=${query}`, {
         //       headers: { Authorization: `Bearer ${JSON.parse(theUser).token}` },
         //    })
         //    .then((res) => {
         //       console.log(res.data.answer);
         //       setResult(res.data.answer);
         //    });
      } else {
         swal('You need to login to use this feature!', {
            icon: 'warning',
         });
      }
   };

   const closeModal = () => setOpenAnswer(false);

   return (
      <>
         <div className={cx('wrapper')}>
            <center>
               <div className={cx('content')}>
                  <h1 className={cx('title')}>{dbName}</h1>
                  <div className={cx('action-buttons')}>
                     <Button delBtn onClick={handleDelete} small>
                        Delete
                     </Button>
                     <Button outline to={config.routes.home} small>
                        Close
                     </Button>
                  </div>
                  <TableWithSelect value={dbType} options={dbTypes} onChange={handleChangeDbType} />
                  <div className={cx('db-schema')}>
                     <TableWithSchema data={dbSchema} onChange={handleChangeDbSchema} />
                  </div>
                  <TableWithInput
                     title="⌨ Prompt (ctrl + Enter to submit)"
                     textArea="Write your prompt. Ex: Which supplier sold more products in the current year?"
                     onChange={handleChangeQuery}
                  />
                  <div className={cx('btn-submit')}>
                     <Button primary onClick={handleSubmit}>
                        Submit
                     </Button>
                  </div>
               </div>
            </center>

            <Popup open={openAnswer} closeOnDocumentClick onClose={closeModal}>
               <QueryAnswer body={result} title="Answer" />
            </Popup>
         </div>
      </>
   );
}

export default Database;
