import React, { createContext, useState } from 'react';
import axios from 'axios';
import config from '~/config';

export const DatabasesContext = createContext();

export const DatabasesProvider = ({ children }) => {
   const [databases, setDatabases] = useState(null);

   const reloadDatabases = async () => {
      const theUser = localStorage.getItem('user');
      if (theUser && !theUser.includes('undefined')) {
         axios
            .get(`${config.api.url}/database/name`, {
               headers: {
                  Authorization: `Bearer ${JSON.parse(theUser).token}`,
               },
            })
            .then((res) => {
               setDatabases(res.data.databases);
            });
      } else {
         // get databases in local storage
         const dbs = localStorage.getItem('databases');
         if (dbs) setDatabases(JSON.parse(dbs));
      }
   };

   return <DatabasesContext.Provider value={{ databases, reloadDatabases }}>{children}</DatabasesContext.Provider>;
};
