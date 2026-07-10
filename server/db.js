
const { DatabaseSync } = require('node:sqlite');
const bcrypt = require('bcryptjs');

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
    insert.run(null, 'Alaskan-Malamute.webp');
    insert.run(null, 'Untitled.jpg');

}

function getImagesURL(dataBaseParam){
    if(dataBaseParam.isOpen == false){
        dataBaseParam.open();
    }

    // Create a prepared statement to read data from the database.
    const query = dataBaseParam.prepare('SELECT * FROM images');

    // Execute the prepared statement and return the result set object.
    const urlList = query.all();

    return urlList;
}

function signUp(dataBaseParam, username, password, rpassword){
    if(dataBaseParam.isOpen == false){
        dataBaseParam.open();
    }

    if(password !== rpassword){
        return false;
    }

    const checkQuery = dataBaseParam.prepare('SELECT * FROM users WHERE username = ?');
    checkQuery.all(username);

    if(checkQuery.length > 0){
        return false;
    }
    
    const hash = await bcrypt.hash(password, 10);

    const insert = dataBaseParam.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');

    // Execute the prepared statement with bound values.
    insert.run(null, username, hash);

    if(insert.lastInsertRowid > 0){
        return true;
    }else{
        return false;
    }
}

function logIn(dataBaseParam, username, password){
    if(dataBaseParam.isOpen == false){
        dataBaseParam.open();
    }

    const selectQuery = dataBaseParam.prepare('SELECT * FROM users WHERE username = ?');
    selectQuery.all(username);

    const matchResult = await bcrypt.compare(selectQuery[0].password);
    
    //Returns true or false;
    return matchResult;
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
  getImagesURL,
  closeDB,
  signUp,
  logIn,
};

// Execute SQL statements from strings.
//database.exec(`
//  CREATE TABLE images(
//    id INTEGER PRIMARY KEY,
//    image_address TEXT
//  ) STRICT
//`);