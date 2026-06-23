
const { DatabaseSync } = require('node:sqlite');

function openDB(){
    const dataBase = new DatabaseSync('./dogs.db');
    
    //Checks if table exists, tableExists is a boolean assigned from a comparison
    const query = "SELECT name FROM sqlite_master WHERE type='table' AND name=?";
    const tableExists = dataBase.prepare(query).get('images') !== undefined;

    if (tableExists == false){
        createDB(dataBase);
    }

    return dataBase;
}

function createDB(dataBaseParam){
    if(dataBaseParam.isOpen == false){
        dataBaseParam.open();
    }

    //In node the sqlite library automatically creates the .db file if it doesn't exist

    // Execute SQL statements from strings.
    dataBaseParam.exec('CREATE TABLE images(id INTEGER PRIMARY KEY, imageAddress TEXT) STRICT');

    // Create a prepared statement to insert data into the database.
    const insert = dataBaseParam.prepare('INSERT INTO images (id, imageAddress) VALUES (?, ?)');

    // Execute the prepared statement with bound values.
    insert.run(null, './images/Alaskan-Malamute.webp');
    insert.run(null, './images/Untitled.jpg');

}

function getImageAddresses(dataBaseParam){
    if(dataBaseParam.isOpen == false){
        dataBaseParam.open();
    }

    // Create a prepared statement to read data from the database.
    const query = dataBaseParam.prepare('SELECT * FROM images');

    // Execute the prepared statement and return the result set object.
    const addressesList = query.all();

    return addressesList;
}

function closeDB(dataBaseParam){
    if(dataBaseParam.isOpen == true){
        dataBaseParam.close();
        return true;
    }
    return false;
}

module.exports = {
  openDB,
  getImageAddresses,
  closeDB,
};

// Execute SQL statements from strings.
//database.exec(`
//  CREATE TABLE images(
//    id INTEGER PRIMARY KEY,
//    image_address TEXT
//  ) STRICT
//`);