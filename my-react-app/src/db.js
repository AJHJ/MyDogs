
import { DatabaseSync } from 'node:sqlite';

export function openDB(){
    dataBase = new DatabaseSync('./dogs.db');
    
    if (database == null){
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
    const insert = database.prepare('INSERT INTO images (id, imageAddress) VALUES (?, ?)');

    // Execute the prepared statement with bound values.
    insert.run(null, './assets/Alaskan-Malamute.webp');
    insert.run(null, './assets/Untitled.jpg');

}

export function getImageAddresses(dataBaseParam){
    if(dataBaseParam.isOpen == false){
        dataBaseParam.open();
    }

    // Create a prepared statement to read data from the database.
    const query = dataBaseParam.prepare('SELECT * FROM images');

    // Execute the prepared statement and return the result set object.
    return addressesList = query.all();
}

export function closeDB(dataBaseParam){
    if(dataBaseParam.isOpen == true){
        dataBaseParam.close();
        return true;
    }
    return false;
}
// Execute SQL statements from strings.
//database.exec(`
//  CREATE TABLE images(
//    id INTEGER PRIMARY KEY,
//    image_address TEXT
//  ) STRICT
//`);