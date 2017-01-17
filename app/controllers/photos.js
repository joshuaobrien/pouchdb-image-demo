import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    safariAlertTest() {
      alert('Safari');
    },

    querySpace() {
      navigator.webkitTemporaryStorage.queryUsageAndQuota(
        function(usedBytes, grantedBytes) {
          alert('Using: ' + usedBytes/1000000 + 'mb');
          alert('Available: ' + grantedBytes/1000000 + 'mb');
        },
        function(e) { console.log('Error', e); }
      );


    },

    stressTest() {
      var that = this;

      var inputFile = document.querySelector('#inputFile');
      var imageMetaData = document.querySelector('#img_meta_data');

      var getFile = inputFile.files[0];

      var reader = new FileReader();

      reader.onload = function(ayyy, potato) {
        var raw = reader.result;

        var test = Ember.Object.create({
          'name': getFile.name,
          'content_type': getFile.type,
          'data': raw
        });


        for (var i = 0; i < 2; i++) {
          var pic = that.store.createRecord("picci", {
              name: 'potatoes',
              photos: test
          });

          pic.save();
        }

      }

        reader.readAsDataURL(getFile);
    },

    testFunc() {
    },

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
