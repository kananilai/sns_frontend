<template>
  <div class="container mx-auto">
    <div class="post-border">
      <div>
        <textarea class="form-control" id="content" rows="7" v-model="content" name="content" required></textarea>
      </div>
      <div class="text-center m-3">
        <button type="submit" class="btn btn-dark" @click="post">Post</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import '@firebase/auth';

export default{
  data(){
    return{
      content:'',
      postsData:[],
      user_name:'',
      uid:'',
    };
  },
methods:{
    post(){
      console.log(this.content);
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          const sendData = {
            uid:user.uid,
            content:this.content
          }
          this.$axios.post("http://127.0.0.1:8000/api/post",sendData).
          then((response) => {
              console.log(response);
              this.user_name = response.data.data.user_name;
              this.content= '';
              this.$emit('getPost');
          });
        }
      })
    },
  },
}
</script>

<style>
.post-border{
  border:2px solid rgb(129, 129, 129);
  border-radius: 30px;
  padding:20px;
  margin-top:30px;
}
</style>
