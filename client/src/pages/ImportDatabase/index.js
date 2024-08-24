import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import TableWithInput from '~/components/TableWithInput';
import TableWithSelect from '~/components/TableWithSelect';
import config from '~/config';
import styles from './ImportDatabase.module.scss';
import axios from 'axios';
import { dbTypes } from '~/utils/types/dbTypes';
import TableWithImport from '~/components/TableWithImport';
import swal from 'sweetalert';
import Instruction from '~/components/Instruction';
import { DatabasesContext } from '~/context/DatabaseContext';

const cx = classNames.bind(styles);

function ImportDatabase() {
   const [dbName, setDbName] = useState('');
   const [dbType, setDbType] = useState('MySQL');
   const [url, setUrl] = useState('');
   const [file, setFile] = useState();
   const [isImportFromFile, setIsImportFromFile] = useState(true);
   const { reloadDatabases } = useContext(DatabasesContext);

   let navigate = useNavigate();

   const handleChangeDbName = (dbName) => {
      setDbName(dbName);
   };

   const handleChangeDbType = (dbType) => {
      setDbType(dbType);
   };

   const handleChangeUrl = (url) => {
      setUrl(url);
   };

   const handleChangeFile = (file) => {
      setFile(file);
   };

   const handleChangeImportFromFile = (isImportFromFile) => {
      setIsImportFromFile(isImportFromFile);
   };

   const handleSubmit = () => {
      if (!dbName || !dbType || !(url || file)) return alert('Please fill all the fields!');

      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (token) {
         //save to database
         const data = new FormData();
         data.append('name', dbName);
         data.append('type', dbType);
         data.append('url', url);
         data.append('file', file);

         axios
            .post(config.api.url + '/database/import', data, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            })
            .then((res) => {
               reloadDatabases();
               navigate(`${config.routes.database}/${res.data.database._id}`);
            })
            .catch((err) => {
               swal('Error', err.response.data.message, 'error');
            });
      } else {
         swal('Error', 'Please login to use this feature!', 'error');
      }
   };

   const handleCancel = () => {
      navigate(config.routes.home);
   };

   return (
      <div className={cx('wrapper')}>
         <center>
            <p className={cx('title')}>Import database</p>
            <TableWithInput title="📝 Database name" textInput="Database name" onChange={handleChangeDbName} />
            <TableWithSelect title="🔌 Database type" options={dbTypes} onChange={handleChangeDbType} value={dbType} />
            <TableWithImport
               title="🗃️ Schema"
               url={url}
               onChangeFile={handleChangeFile}
               onChangeUrl={handleChangeUrl}
               onChangeImportFromFile={handleChangeImportFromFile}
            />

            <div className={cx('action-buttons')}>
               <Button outline onClick={handleCancel}>
                  Cancel
               </Button>
               <Button primary onClick={handleSubmit}>
                  Create database
               </Button>
            </div>
            <Instruction importFromFile={isImportFromFile} />
         </center>
      </div>
   );
}

export default ImportDatabase;
