import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@Injectable()
export class ImghandlerProvider {
  nativepath: any;
  firestore = firebase.storage();
  constructor(public filechooser: FileChooser, public loadingCtrl: LoadingController, public camera: Camera) {
  }

  
 /*
 For uploading an image to firebase storage.

 Called from - profilepic.ts
 Inputs - None.
 Outputs - The image url of the stored image. 
 */
uploadimage() {
  let loader = this.loadingCtrl.create({
    content: 'Please wait'
  });
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }
  var promise = new Promise((resolve, reject) => {
    this.camera.getPicture(options).then((imageData) => {
    loader.present();
    var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
    imageStore.putString(imageData, 'base64').then((res) => {
    this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
    loader.dismiss()
    resolve(url);
  }).catch((err) => {
      reject(err);
    })
  }).catch((err) => {
    reject(err);
  })
  }, (err) => {
    }).catch((err) => {
    reject(err);
    });
    loader.dismiss();
  })
  return promise;
  }

  picmsgstore() {
    var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var uuid = this.guid();
                  var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
                  imageStore.put(imgBlob).then((res) => {
                      resolve(res.downloadURL);
                    }).catch((err) => {
                        reject(err);
                    })
                  .catch((err) => {
                    reject(err);
                  })
                }
              })
            })
          })
      })
    })    
    return promise;   
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    }
    
    grouppicstore(groupname) {
      var promise = new Promise((resolve, reject) => {
          this.filechooser.open().then((url) => {
            (<any>window).FilePath.resolveNativePath(url, (result) => {
              this.nativepath = result;
              (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
                res.file((resFile) => {
                  var reader = new FileReader();
                  reader.readAsArrayBuffer(resFile);
                  reader.onloadend = (evt: any) => {
                    var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                    var imageStore = this.firestore.ref('/groupimages').child(firebase.auth().currentUser.uid).child(groupname);
                    imageStore.put(imgBlob).then((res) => {
                      this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).child(groupname).getDownloadURL().then((url) => {
                        resolve(url);
                      }).catch((err) => {
                          reject(err);
                      })
                    }).catch((err) => {
                      reject(err);
                    })
                  }
                })
              })
            })
        })
      })
      return promise;   
  }

}