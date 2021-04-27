// Empty variable for db
let db;

// Create new request for a specified databse
const request = indexedDB.open("budgetTracker", 1);

// Called to change database from no db to 1st version, 1st version to 2nd etc.
request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("pending", {
        autoIncrement: true
    });
};

// Called each time a new request is made
request.onsuccess = (event) => {
    db = event.target.result;
    if(navigator.onLine){
        checkDatabase();
    }
};

// Called in the event of an error
request.onerror = (event) => {
    console.log(`Error: ${event.target.errorCode}`);
};

// Function to save a record to IndexedDB
const saveRecord = (record) => {
    // Create a new transaction on the 'pending' db with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");
    // Access the 'pending' object store
    const store = transaction.objectStore("pending");
    // Add the record to the object store
    store.add(record);
}

// Function to check the databse for changes
const checkDatabase = () => {
    // Open a transaction on the 'pending' db
    const transaction = db.transaction("pending");
    // Access the 'pending' object store
    const store = transaction.objectStore("pending");
    // Get all records
    const getAll = store.getAll();

    // If getAll() succeeds POST data to '/api/transaction/bulk'
    getAll.onsuccess = () => {
        if(getAll.result.length > 0){
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            }).then(
                (response) => response.json()
            ).then(
                () => {
                    // On success, open a transaction on 'pending' db
                    const transaction = db.transaction(["pending"], "readwrite");
                    // Access the 'pending' object store
                    const store = transaction.objectStore("pending");
                    // Delete everything in object store
                    store.clear();
                }
            );
        }
    };
}

// Listens for a network connection & calls checkDatabase if there is one
window.addEventListener("online", checkDatabase);