import classNames from 'classnames/bind';
import styles from './TableWithImport.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TableWithImport({ title, url, onChangeUrl, onChangeFile, onChangeImportFromUrl }) {
   const [urlMode, setUrlMode] = useState(true);

   const handleChangeMode = () => {
      setUrlMode(!urlMode);
      onChangeImportFromUrl(urlMode);
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
               <button className={urlMode && cx('active')} onClick={handleChangeMode}>
                  Url
               </button>
               <button className={!urlMode && cx('active')} onClick={handleChangeMode}>
                  File
               </button>
            </div>
         </div>
         <div className={cx('body')}>
            {urlMode ? (
               <input
                  className={cx('url')}
                  onChange={handleChangeUrl}
                  value={url}
                  type="text"
                  placeholder="Ex: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
               />
            ) : (
               <input className={cx('file')} onChange={handleChangeFile} type="file" />
            )}
         </div>
      </div>
   );
}

export default TableWithImport;
