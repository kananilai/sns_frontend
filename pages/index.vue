<template>
  <div class="back-ground">
    <Nuxt />
    <div class="container d-flex">
      <div class="col-5">
      <Post @getPost="getPostData"></Post>
      </div>
      <div class="col-7 mt-4">
        <div class="card mx-auto col-10 my-2"  v-for="post in postData" :key="post.id">
          <div class="row no-gutters">
            <div class="col-md-8">
              <div class="card-body">
                <div>

                  <h5 class="card-title">{{post.user_name}}</h5>
                  <p class="card-text">{{post.content}}</p>
                  <a @click="like(post.id)" v-if="post.isLike == 'false'"><i class="far fa-gem unlike fa-lg"></i></a>
                  <a @click="like(post.id)" v-else-if="post.isLike == 'true'"><i class="fas fa-gem like fa-lg"></i></a>
                  {{ post.likeCount }}
                  <a @click="$router.push({path: '/comment/' + post.id})"><i class="fas fa-comment comment"></i></a>
                  <a @click="destroy(post.id)"><i class="fas fa-trash-alt trash"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import '@firebase/auth';

export default{
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css' }
    ]
  },
  layout(){
    return 'top_header'
  },
  data(){
    return{
      postData:[],
      user_name:'',
      status:'',
    }
  },
  methods:{
    async getPostData(){
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
          console.log(user.uid);
          const sendData = {
            uid:user.uid,
          }
          this.$axios.post(
            "http://127.0.0.1:8000/api/index",sendData
          ).then((response) =>{
              console.log(response.data);
              this.postData = response.data.data;
              this.user_name = response.data.user;
          })
        }
      })
    },
    like(id){
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          const sendData = {
            user_id:user.uid,
            post_id:id,
          }
          this.$axios.post("http://127.0.0.1:8000/api/like", sendData)
          .then((response) => {
            console.log(response);
            this.status=response.data.status
            this.getPostData();
          })
        }
      })
    },
    destroy(id){
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          const sendData ={
            uid:user.uid,
            post_id:id,
          }
          this.$axios.post("http://127.0.0.1:8000/api/delete", sendData)
          .then((response) => {
            console.log(response);
            alert(response.data.data)
            this.getPostData();
          })
        }
      })
    },
  },
  created(){
    //投稿取得
    this.getPostData();
  }
}
</script>

<style scoped>
.back-ground{
  background-color: #cbd2d03f;
  height:100vh;
}
.like{
  color:rgb(65, 175, 166)
}
.unlike{
  color:rgb(135, 135, 148)
}
.comment{
  margin:0 20px;
}
</style>
