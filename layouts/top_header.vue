<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light  p-3">
      <a class="navbar-brand" href="#"></a>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <div v-if="this.result=='true'" style="display:flex;">
            <li class="nav-item active">
              <NuxtLink class="nav-link nav-coolor" to="/" style="color:#000; font-weight:bold;">ホーム</NuxtLink>
            </li>
            <li class="nav-item active">
              <NuxtLink class="nav-link nav-coolor" to="/" style="color:#000; font-weight:bold;">投稿</NuxtLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout" style="color:#000; font-weight:bold;">ログアウト</a>
            </li>
          </div>
          <div  v-else style="display:flex;">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/register" style="color:#000; font-weight:bold;">新規登録</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login" style="color:#000; font-weight:bold;">ログイン</NuxtLink>
            </li>
          </div>
        </ul>
      </div>
    </nav>
    <nuxt />
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import '@firebase/auth';

export default {
  data(){
    return{
      result: '',
    }
  },
  methods:{
    check(){
      firebase.auth().onAuthStateChanged((user)=> {
        if(user){
          this.result = 'true'
          console.log(this.result);
        } else{
          this.result = 'false'
        }
      })
    },
    logout(){
      firebase.auth().signOut()
      .then(()=>{
        alert('ログアウトが完了しました。');
        this.$router.replace('/');
      })
    }
  },
  created(){
    this.check();
  }
}

</script>

<style>
.nav-color{
  color:#fff
}
.navbar{
  background-color:#20b2aa ;
}
</style>
