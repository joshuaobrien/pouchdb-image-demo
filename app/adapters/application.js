import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

var remote = new PouchDB('http://localhost:5984:/squid');
var db = new PouchDB('local_pouch');

db.sync(remote, {
  live: true,
  retry: true
});

export default Adapter.extend({
  db: db
});
