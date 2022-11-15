//                         .
//                        .:.
//                        :|:
//                       .:|:.
//                       ::|::
//        :.             ::|::             .:
//        :|:.          .::|::.          .:|:
//        ::|:.         :::|:::         .:|:;
//        `::|:.        :::|:::        .:|::'
//         ::|::.       :::|:::       .::|:;
//         `::|::.      :::|:::      .::|::'
//          :::|::.     :::|:::     .::|::;
//          `:::|::.    :::|:::    .::|::;'
// `::.      `:::|::.   :::|:::   .::|::;'      .:;'
//  `:::..     ¹::|::.  :::|:::  .::|::¹    ..::;'
//    `:::::.    ':|::. :::|::: .::|:'   ,::::;'
//      `:::::.    ':|:::::|:::::|:'   :::::;'
//        `:::::.:::::|::::|::::|::::.,:::;'
//           ':::::::::|:::|:::|:::::::;:'
//              ':::::::|::|::|:::::::''
//                   `::::::::::;'
//                  .:;'' ::: ``::.
//                       :':':
//                         ;
// [plantango.app]
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { llenarDB } = require("./src/controller/plantas.js");
const{ llenarDBProd } = require("./src/controller/productos.js")
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(llenarDB)
  .then(llenarDBProd)
  .then(() => {
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  });
