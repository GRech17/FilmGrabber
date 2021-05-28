// create connection to indexeddb for film-grabber
let db;
const request = indexedDB.open("film-grabber_tracker", 1);
const requests = [];

// handle upgrades and versioning
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  console.log({ onupgradeneeded: db });
  // create an object store 'save_movie', set it to have auto incrementing primary key
  db.createObjectStore("save_movie", { autoIncrement: true });
};

// upon successful db connection/creation
request.onsuccess = function (event) {
  // save reference to db in global variable
  db = event.target.result;
  console.log({ onsuccess: db });
  // if offline run upload() and store in indexedDb
  if (navigator.onLine) {
    upload();
  }
};

request.onerror = function (event) {
  // log error to console
  console.log(event.target.errorCode);
};
// This function will be executed if we attempt to submit a new movie and there's no internet connection
// function saveRequest(request) {
//   requests.push(request);
// }

function upload() {
  while (requests.length) {
    const request = requests.shift();
    request();
  }
}

// Listen for when the app goes back online
window.addEventListener("online", upload);

function save(record) {
  // open a new transaction with the database with read and write permissions
  const request = db.transaction(["save_movie"], "readwrite");

  // access the object store for `new_movie`
  const requestStore = request.objectStore("save_movie");

  console.log({ record });

  // add record to your store with add method
  requestStore.add(record);
}

function upload() {
  // open transaction with db to read data
  const transaction = db.transaction(["save_movie"], "readwrite");
  // access the object store
  const requestStore = transaction.objectStore("save_movie");
  // get all records from store and place into variable
  const getAll = requestStore.getAll();

  getAll.onsuccess = async function () {
    // sync any data stored in indexeddb with central server
    if (!getAll.result.length) return;

    const token = window.localStorage.getItem("id_token");
    const queries = getAll.result.map((result) =>
      fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(result),
      })
    );

    await Promise.all(queries);

    // Open one more transaction
    const transaction = db.transaction(["save_movie"], "readwrite");

    // Add the new_movie to object store
    const moviesStore = transaction.objectStore("save_movie");

    // Clear all the items in the object store
    moviesStore.clear();

    window.dispatchEvent(new CustomEvent("movies_saved"));
    alert("Your watchlist has been synchronized with the central database");
  };
}
