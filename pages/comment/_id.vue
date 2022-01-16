<template>
  <div class="back-ground">
    <Nuxt />
    <div class="content card mx-auto col-5">
      <div class="card-body" v-for="post in postData" :key="post.id">
        <p class="card-title post_user_name">{{post.user_name}}</p>
        <p class="post_content">{{ post.content}}</p>
      </div>
    </div>
    <div class="text-center">
      <button class=" btn btn-outline-secondary col-1 mx-auto" @click="$router.go(-1)">戻る</button>
    </div>
    <div class="card mx-auto col-5 my-2 pb-3 comment-form">
      <textarea rows="5" class="mx-auto form-control" style="width:80%;" v-model="comment"></textarea>
      <button type="submit" class="btn btn-outline-success col-2 mx-auto mt-2" @click="storeComment">コメント</button>
    </div>
    <div class="content card mx-auto col-3 m-3"  v-for="comment in commentData" :key="comment.id">
      <p class="m-2 post_content">{{ comment.user_name}}</p>
      <div class="d-flex justify-content-between">
        <p class="m-2 ml-3 post_content">{{ comment.comment}}</p>
        <p class="m-2 post_content text-right">{{ comment.created_at| moment}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import '@firebase/auth';
import moment from 'moment';

export default{
  layout(){
    return 'top_header'
  },
  data(){
    return {
      query: this.$route.params.id,
      postData:[],
      content:'',
      user_name:'',
      comment:'',
      commentData:[],
    }
  },
  created(){
    this.getPostData();
    this.getCommentData();
  },
  methods:{
    getPostData(){
      console.log(this.query)
      const sendData= {
        post :this.query
      };
      this.$axios.get(
        "http://127.0.0.1:8000/api/post/get/" + this.$route.params.id,sendData
      ).then((response) => {
        console.log(response.data.data);
        this.postData = response.data.data;
      })
    },
    storeComment(){
      console.log(this.comment);
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          const sendData = {
            post_id:this.query,
            user_id:user.uid,
            comment:this.comment
          }
          this.$axios.post
          ("http://127.0.0.1:8000/api/comment/store", sendData)
          .then((response) => {
            console.log(response);
            this.comment ='';
            this.getCommentData();
          })
        }
      })
    },
    getCommentData(){
      this.$axios.get(
        "http://127.0.0.1:8000/api/comment/get/"+ this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.commentData = response.data.data;
        })
    }
  },
  filters: {
    moment: function(date) {
      console.log(date);
      return moment(date).format('M月D日  HH:mm');
    },
  }
}
</script>

<style>
.back-ground{
  /* height:100%; */
  padding:30px
}
.card-title{
  font-weight:bold;
  border-bottom:1px solid rgb(197, 197, 197);
  padding-bottom:2px;
}
.content{
  margin-bottom:20px;
}
.comment-form{
  background-color: #20b2ab79 ;
  margin-top:30px;
  padding-top:30px;
}

</style>
