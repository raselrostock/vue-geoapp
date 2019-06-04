<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{ profile.alias}}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment,ind) in comments" :key="ind">
          <div class="deep-purple-text">{{ comment.from}}</div>
          <div class="grey-text text-darken-2">{{ comment.content}}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">add a comment:</label>
          <input type="text" name="comment" v-model="newcomment">
          <p v-if="feedback" class="red-text center">{{feedback}}</p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null,
      newcomment: null,
      feedback: null,
      comments: []
    };
  },
  methods: {
    addComment() {
      if (this.newcomment) {
        this.feedback = null;
        db.collection("comments")
          .add({
            to: this.$route.params.id,
            from: this.user.alias,
            content: this.newcomment,
            time: Date.now()
          })
          .then(() => {
            this.newcomment = null;
          });
      } else {
        this.feedback = "Write a comment";
      }
    }
  },
  created() {
    let ref = db.collection("users");
    // get current user
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          (this.user = doc.data()), (this.user.id = doc.id);
        });
      });
    //profile data
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
      });
    // comments
    db.collection("comments")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content
            });
          }
        });
      });
  }
};
</script>
<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}
.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}
.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>