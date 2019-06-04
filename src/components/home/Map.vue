<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Map",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
    }
  },
  mounted() {
    // Get current user
    let user = firebase.auth().currentUser;
    // Get user Geo Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          (this.lat = pos.coords.latitude),
            (this.lng = pos.coords.longitude),
            db
              .collection("users")
              .where("user_id", "==", user.uid)
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  db.collection("users")
                    .doc(doc.id)
                    .update({
                      geolocation: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                      }
                    });
                });
              })
              .then(() => {
                this.renderMap();
              });
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      this.renderMap();
    }
  }
};
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  left: 0;
  top: 0;
  position: absolute;
  z-index: -1;
}
</style>