module.exports.formQuery = (query, type, schema) => {
  let preQuery = `I have a ${type} database which have tables:\n\n`;
  schema.forEach((table) => {
    preQuery += `${table.name}(`;
    table.columns.forEach((column) => {
      preQuery += `${column.name}, `;
    });
    preQuery = preQuery.slice(0, -2);
    preQuery += `);\n`;
  });
  preQuery += `\n${query}\nYou need generate only query and return for me. Dont explain for it or return another.`;

  return preQuery;
};
