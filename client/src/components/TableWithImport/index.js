import classNames from 'classnames/bind';
import styles from './TableWithImport.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TableWithImport({ title, url, onChangeUrl, onChangeFile, onChangeImportFromFile }) {
   const [importFromFileMode, setImportFromFileMode] = useState(true);

   const handleChangeMode = () => {
      onChangeImportFromFile(!importFromFileMode);
      setImportFromFileMode(!importFromFileMode);
   };

   const handleChangeUrl = (event) => {
      if (onChangeUrl) {
         onChangeFile('');
         onChangeUrl(event.target.value);
      }
   };

   const handleChangeFile = (event) => {
      if (onChangeFile) {
         onChangeUrl('');
         onChangeFile(event.target.files[0]);
      }
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('header')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('mode')}>
               <button className={importFromFileMode && cx('active')} onClick={handleChangeMode}>
                  File
               </button>
               <button className={!importFromFileMode && cx('active')} onClick={handleChangeMode}>
                  Url
               </button>
            </div>
         </div>
         <div className={cx('body')}>
            {importFromFileMode ? (
               <input className={cx('file')} onChange={handleChangeFile} type="file" />
            ) : (
               <input
                  className={cx('url')}
                  onChange={handleChangeUrl}
                  value={url}
                  type="text"
                  placeholder="Ex: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
               />
            )}
         </div>
      </div>
   );
}

export default TableWithImport;
