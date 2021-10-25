import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Restaurant } from '../model/restaurant';
import { RestaurantsService } from '../restaurants.service';
import { getFirestore, collection, addDoc, getDocs, doc, Timestamp, deleteDoc, setDoc } from '@firebase/firestore/lite';
import { getStorage, uploadBytes, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { DBService } from '../db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  /*
  restaurants: Restaurant[] = [
    new Restaurant("McDonalds", 30, 4.3, "burger, Indian, Continantal"),
    new Restaurant("Table By Basant", 40, 4.5, "Indian, Chinesse, Continantal"),
  ];
  */
  file: any;
  restaurantList : any;
  addView = false;
  text = "Add Restaurant";
  updateMode = false;

  cities = [
    {cityName: "Select City", state:""},
    {cityName: "Ludhiana", state:"Punjab", pinCode: [141001, 141002, 141005]},
    {cityName: "Chandigarh", state:"Punjab"},
    {cityName: "Amritsar", state:"Punjab"},
    {cityName: "Jalandhar", state:"Punjab"},
    {cityName: "Phagwara", state:"Punjab"},
  ];

  restaurantForm = new FormGroup(
    {
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      veg: new FormControl(false),
      nonVeg: new FormControl(false),
      servingType: new FormControl('delivery'),
      city: new FormControl(this.cities[0]),
      image: new FormControl('')
    }
  );

  //restaurants = this.service.getRestaurants();

  constructor(private db: DBService, private route: ActivatedRoute) {
    this.fetchPromoRestaurants();
   }

  action: String = "";
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action']
      if(this.action == "delete"){
        const docId = "";
        this.deleteRestaurant(docId);
      }else if(this.action == "update"){
        this.addView = true;
        this.updateMode = true;
        this.text = "Update Restaurant";

        const sessionData = sessionStorage.getItem("restaurant");
        const restaurantData = JSON.parse(sessionData!);

        this.restaurantForm.patchValue(
          {
            name: restaurantData.name,
            email: restaurantData.email
          }
        );
        const docId = "";
        this.updateRestaurant(docId);
      }else{
        console.log("Do Nothing or Handle the Case");
      }
    });
  }

  addRestaurant(name: string, timeToDeliver: string, ratings: string, categories: string){
    //this.restaurants.push(new Restaurant(name, Number(timeToDeliver), Number(ratings), categories))
  }

  async fetchPromoRestaurants(){
    const firestoreDB = getFirestore(this.db.app);
    const promoCodeCollection = collection(firestoreDB, 'restaurants');
    const snapshots = await getDocs(promoCodeCollection);
    this.restaurantList = snapshots.docs.map(doc => doc.data());
    console.log(this.restaurantList);

    snapshots.docs.map(
      doc => console.log(doc.id)
    );
  }

  pickFile(event:any){
    this.file = event.target.files[0];
    console.log(this.restaurantForm.value);
    console.log(this.file); 
  }

  uploadImgeToFirebase(){
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageReference = getStorage();
    const restaurantImageReference = ref(storageReference, "restaurant-images/"+this.file.name);
    uploadBytes(restaurantImageReference, this.file, metadata).then((snapshot) => {
      console.log("Image Uploaded Successfully");
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL); 
        // Save Restaurant Object in FirebaseFirestore
        const dataToSave = this.restaurantForm.value;
        // Save this in Firebase
        dataToSave['imageUrl'] = downloadURL;
        dataToSave['creationTime'] = Timestamp.now();
        console.log("dataToSave is: "+dataToSave);

        const firestoreDB = getFirestore(this.db.app);
        
        const restaurantCollection = collection(firestoreDB, 'restaurants');
        addDoc(restaurantCollection, dataToSave);
        console.log("Restaurant Added");
       })
       .catch((error) => {
         console.log("Something Went Wrong");
      });
        });
  }

  deleteRestaurant(docID: any){
    console.log("Delete Clicked");
    const firestoreDB = getFirestore(this.db.app);
    deleteDoc(doc(firestoreDB, "restaurants", docID));
}

updateRestaurant(docID: any){
  const firestoreDB = getFirestore(this.db.app);
  const documentToWrite = doc(firestoreDB, 'restaurants', docID);
  const restaurantData = this.restaurantForm.value;
  setDoc(documentToWrite, restaurantData);
}

  addRestaurantToFirebase(){
    console.log(this.restaurantForm.value);
    this.uploadImgeToFirebase();
    //this.restaurantForm.reset();
    
  }

  changeView(){
    this.addView = !this.addView;
    if(this.addView){
      this.text = "View Restaurants";
    }else{
      this.text = "Add Restaurant";
    }
  }

  saveDataInSession(restaurant: any){
    console.log(restaurant);
    sessionStorage.setItem("restaurant", JSON.stringify(restaurant));
    console.log("Restaurant Saved in Session Storage");
  }
}


