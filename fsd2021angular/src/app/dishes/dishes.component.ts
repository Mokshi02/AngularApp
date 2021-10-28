import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Restaurant } from '../model/restaurant';
import { RestaurantsService } from '../restaurants.service';
import { getFirestore, collection, addDoc, getDocs, doc, Timestamp, deleteDoc, setDoc} from '@firebase/firestore/lite'
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import { DBService } from '../db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishList : any;
  dishForm = new FormGroup(
    {
      name: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl('')
    }
  );

  tempImageFile: any;

  constructor(private db: DBService, private route: ActivatedRoute) {  }

  restaurantId: String = "";
  restaurantName: String = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // const sessionData = sessionStorage.getItem("restaurant/dishes"+"/dishes");
      this.restaurantId = params['id'];
      this.restaurantName = params['name'];
      this.fetchDishes();
    });
  }

  async fetchDishes(){
    let firestoreDB = getFirestore(this.db.app);
    let promoCodeCollection = collection(firestoreDB, `restaurants/${this.restaurantId}/dishes`);
    let snapshots = await getDocs(promoCodeCollection);
    
    this.dishList = snapshots.docs.map(
      doc => {
        const data = doc.data();
        data['docId'] = doc.id;
        return data;
      }
    );
     
    console.log(this.dishList);
  }

  async addDishToFirebase(){
    let values = { ...this.dishForm.value };
    let firestoreDB = getFirestore(this.db.app);
    let collectionRef = collection(firestoreDB, `restaurants/${this.restaurantId}/dishes`);

    if(this.tempImageFile !== null) {
      let storageDB = getStorage(this.db.app);
      let FileRef = ref(storageDB, `dish-images/${this.tempImageFile.name}`);
      await uploadBytes(FileRef, this.tempImageFile);
      values['imageUrl'] = (await getDownloadURL(FileRef)).toString();
    
    }

    addDoc(collectionRef, { ...values }).then((value) => {
      console.log(">>> Data Uploaded Successfully...");      
    }, (error) => {
      console.log(">>> Error: ", error);
    });
    //this.uploadImgeToFirebase(); try it
  }

  checkImageType(event: any) {
    this.tempImageFile = event.target.files[0];
    if(this.tempImageFile.type === "image/jpeg" || this.tempImageFile.type === "image/jpg" || this.tempImageFile.type === "image/png") {

    } else {
      this.tempImageFile = null;
    }
  }

}
