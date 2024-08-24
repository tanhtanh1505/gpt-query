import classNames from 'classnames/bind';
import styles from './Instruction.module.scss';
import config from '~/config';
import Button from '../Button';
import swal from 'sweetalert';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Instruction({ importFromFile }) {
   const [os, setOs] = useState('');

   useEffect(() => {
      const userAgent = window.navigator.userAgent;
      if (userAgent.indexOf('Win') !== -1) {
         setOs('Windows');
      } else if (userAgent.indexOf('Mac') !== -1) {
         setOs('MacOS');
      } else {
         setOs('Linux');
      }
   }, []);

   const getExportTool = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (token) {
         fetch(`${config.api.url}/database/download-export-tool`, {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/x-executable',
            },
         }).then((response) => {
            response.blob().then((blob) => {
               const url = window.URL.createObjectURL(new Blob([blob]));
               const link = document.createElement('a');
               link.href = url;
               link.setAttribute('download', 'gpt-query-export-tool.bin');
               document.body.appendChild(link);
               link.click();
            });
         });
      } else {
         swal('Error', 'Please login to use this feature!', 'error');
      }
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('content')}>
            <h2>Instruction</h2>
            {importFromFile ? (
               <>
                  <p>
                     To import the database structure, you must provide a database structure obtained from MySQL
                     Workbench, PHP MyAdmin,... or other faster options below.
                  </p>
                  <div className={cx('download-tool')}>
                     <b>Via CMD</b>
                     <SyntaxHighlighter language="bash" style={materialDark} showLineNumbers>
                        {os === 'Windows'
                           ? `"C:\\Program Files\\MySQL\\MySQL Server X.X\\bin\\mysqldump.exe" --no-data -u [user_name] -p [database_name] > db_struct.sql`
                           : `mysqldump --no-data -u [user_name] -p [database_name] > db_struct.sql`}
                     </SyntaxHighlighter>
                  </div>
                  <div className={cx('download-tool')}>
                     <b>Or use our export tool to get the database structure.</b>
                     <Button onClick={getExportTool} primary className={cx('button')}>
                        Download Export Tool
                     </Button>
                     <p>
                        After downloading the tool, open the terminal where the file is downloaded and run the following
                        commands:
                     </p>
                     <SyntaxHighlighter language="bash" style={materialDark} showLineNumbers>
                        {`chmod +x gpt-query-export-tool.bin
./gpt-query-export-tool.bin`}
                     </SyntaxHighlighter>
                     <p>
                        The tool will generate a file named <b>{'<schema>.sql'}</b>. You can use this file to import the
                        database structure.
                     </p>
                  </div>
               </>
            ) : (
               <>
                  <p>To import the database structure, provide a URL (currently only supports MongoDB).</p>
                  <p>Public MongoDB URL example:</p>
                  <SyntaxHighlighter language="bash" style={materialDark} wrapLongLines>
                     {`mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true`}
                  </SyntaxHighlighter>
               </>
            )}
         </div>
      </div>
   );
}

export default Instruction;
