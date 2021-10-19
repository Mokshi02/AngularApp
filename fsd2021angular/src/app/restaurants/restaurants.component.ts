import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Restaurant } from '../model/restaurant';
import { RestaurantsService } from '../restaurants.service';
import { getFirestore, collection, addDoc, setDoc, doc, Timestamp } from '@firebase/firestore/lite';
import { getStorage, uploadBytes, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { DBService } from '../db.service';

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

  constructor(private db: DBService) { }

  ngOnInit(): void {
  }

  addRestaurant(name: string, timeToDeliver: string, ratings: string, categories: string){
    //this.restaurants.push(new Restaurant(name, Number(timeToDeliver), Number(ratings), categories))
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
      });
      });
  }

  addRestaurantToFirebase(){
    // const firestoreDB = getFirestore(this.db.app);
    // const documentToWrite = doc(firestoreDB, 'restaurants');
    //      setDoc(documentToWrite, {
    //       name: this.restaurantForm.value.name,
    //       phone: this.restaurantForm.value.phone,
    //       email: this.restaurantForm.value.email,
    //       veg: this.restaurantForm.value.veg,
    //       nonVeg: this.restaurantForm.value.nonVeg,
    //       servingType: this.restaurantForm.value.servingType,
    //       city: this.restaurantForm.value.city,
    //       image: '',
    //       creationTime: Timestamp.now()
    //      }); 
    console.log(this.restaurantForm.value);
    this.uploadImgeToFirebase();
    
  }
}


