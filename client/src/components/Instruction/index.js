import classNames from 'classnames/bind';
import styles from './Instruction.module.scss';
import config from '~/config';
import Button from '../Button';
import swal from 'sweetalert';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight, materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';

const cx = classNames.bind(styles);

function Instruction({ importFromFile }) {
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
                     Workbench, PHP MyAdmin, or terminal export,...
                     <br />
                     Or use our export tool to get the database structure.
                  </p>
                  <Button onClick={getExportTool} primary className={cx('button')}>
                     Download Export Tool
                  </Button>
                  <br />
                  <p>
                     After downloading the tool, open the terminal where the file is downloaded and run the following
                     commands:
                  </p>
                  <SyntaxHighlighter language="bash" style={materialDark} showLineNumbers>
                     {`chmod +x gpt-query-export-tool.bin
./gpt-query-export-tool.bin`}
                  </SyntaxHighlighter>
                  <br />
                  <p>
                     The tool will generate a file named <b>{'<schema>.sql'}</b>. You can use this file to import the
                     database structure.
                  </p>
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
