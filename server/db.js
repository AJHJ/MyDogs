
const { DatabaseSync } = require('node:sqlite');
const bcrypt = require('bcrypt');

class Database{

    constructor(){
        this.db = new DatabaseSync('./dogs.db');
        //Checks if table exists, tableExists is a boolean assigned from a comparison
        const query = "SELECT name FROM sqlite_master WHERE type='table' AND name=?";
        const tableExists = this.db.prepare(query).get('images') !== undefined;

        if (tableExists == false){
            createDB();
        }

    }

    createDB(){
        if(this.db.isOpen == false){
            this.db.open();
        }

        //In node the sqlite library automatically creates the .db file if it doesn't exist

        // Execute SQL statements from strings.
        this.db.exec('CREATE TABLE images(id INTEGER PRIMARY KEY, imageAddress TEXT) STRICT');

        // Create a prepared statement to insert data into the database.
        const insert = this.db.prepare('INSERT INTO images (id, imageAddress) VALUES (?, ?)');

        // Execute the prepared statement with bound values.
        insert.run(null, 'Alaskan-Malamute.webp');
        insert.run(null, 'Untitled.jpg');

    }

    getImagesURL(){
        if(this.db.isOpen == false){
            this.db.open();
        }

        // Create a prepared statement to read data from the database.
        const query = this.db.prepare('SELECT * FROM images');

        // Execute the prepared statement and return the result set object.
        const urlList = query.all();

        return urlList;
    }

    async signUp(username, password, rpassword){
        if(this.db.isOpen == false){
            this.db.open();
        }

        if(password !== rpassword){
            return false;
        }

        const checkQuery = this.db.prepare('SELECT * FROM users WHERE username = ?');

        const checkResult = checkQuery.all(username);

        console.log("This is the length of the result of the select: "+checkResult.length);
        if(checkResult.length > 0){
            return false;
        }
    
        const hash = await bcrypt.hash(password, 10);

        const insertQuery = this.db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
        // Execute the prepared statement with bound values.
        const insertResult = insertQuery.run(null, username, hash);

        if(insertResult.lastInsertRowid > 0){
            return true;
        }else{
            return false;
        }
    }

    async logIn(username, password){
        if(this.db.isOpen == false){
            this.db.open();
        }

        if(password !== rpassword){
            return false;
        }

        const checkQuery = this.db.prepare('SELECT * FROM users WHERE username = ?');

        const checkResult = checkQuery.all(username);

        const isMatch = await bcrypt.compare(password, checkResult[0].password);
        return isMatch;

        console.log("This is the length of the result of the select: "+checkResult.length);
        if(checkResult.length > 0){
            return false;
        }
    
        return isMatch;
    }

    closeDB(){
        if(this.db.isOpen == true){
            this.db.close();
            return true;
        }
        return false;
    }
}


/*function openDB(){
    dataBase = new DatabaseSync('./dogs.db');
    
    //Checks if table exists, tableExists is a boolean assigned from a comparison
    const query = "SELECT name FROM sqlite_master WHERE type='table' AND name=?";
    const tableExists = dataBase.prepare(query).get('images') !== undefined;

    if (tableExists == false){
        createDB(dataBase);
    }

    return dataBase;
}*/

/*function createDB(){
    if(database.isOpen == false){
        database.open();
    }

    //In node the sqlite library automatically creates the .db file if it doesn't exist

    // Execute SQL statements from strings.
    database.exec('CREATE TABLE images(id INTEGER PRIMARY KEY, imageAddress TEXT) STRICT');

    // Create a prepared statement to insert data into the database.
    const insert = database.prepare('INSERT INTO images (id, imageAddress) VALUES (?, ?)');

    // Execute the prepared statement with bound values.
    insert.run(null, 'Alaskan-Malamute.webp');
    insert.run(null, 'Untitled.jpg');

}*/

/*function getImagesURL(){
    if(database.isOpen == false){
        database.open();
    }

    // Create a prepared statement to read data from the database.
    const query = database.prepare('SELECT * FROM images');

    // Execute the prepared statement and return the result set object.
    const urlList = query.all();

    return urlList;
}*/

/*async function signUp(username, password, rpassword){
    if(database.isOpen == false){
        database.open();
    }

    if(password !== rpassword){
        return false;
    }

    const checkQuery = database.prepare('SELECT * FROM users WHERE username = ?');

    const queryResult = checkQuery.all(username);

    console.log("This is the legth of the result of the select: "+queryResult.length);
    if(queryResult.length > 0){
        return false;
    }
    
    const hash = await bcrypt.hash(password, 10);

    const insertQuery = database.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
    // Execute the prepared statement with bound values.
    insertQuery.run(null, username, hash);

    if(insertQuery.lastInsertRowid > 0){
        return true;
    }else{
        return false;
    }
}*/

/*async function logIn(username, password){
    if(database.isOpen == false){
        database.open();
    }

    const selectQuery = database.prepare('SELECT * FROM users WHERE username = ?');
    selectQuery.all(username);

    const matchResult = await bcrypt.compare(selectQuery[0].password);
    
    //Returns true or false;
    return matchResult;
}*/

/*function closeDB(){
    if(database.isOpen == true){
        database.close();
        return true;
    }
    return false;
}*/

module.exports = Database;/*{
  openDB,
  getImagesURL,
  closeDB,
  signUp,
  logIn,
};*/