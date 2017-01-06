import Ember from 'ember';

export default Ember.Controller.extend({
 actions: {
   uploadPhoto() {
     var inputFile = document.querySelector('#inputFile');
     var imageMetaData = document.querySelector('#img_meta_data');

     var getFile = inputFile.files[0];

     new PouchDB('lean').destroy().then(function () {
       return new PouchDB('lean');
     }).then(function (db) {
       db.put({
         _id: 'image',
         _attachments: {
           "file": {
             type: getFile.type,
             data: getFile
           }
         }
       }).then(function() {
         return db.getAttachment('image', 'file');
       }).then(function(blob) {
         var url = URL.createObjectURL(blob);
         var img = document.createElement('img');
         img.src = url;
         document.body.appendChild(img);

       }).catch(function (err) {
         console.log(err);
       })
     });
     }


 }
});
