<template>
  <div class="col-5 mx-auto border rounded p-3 mt-5">
    <div class="form-group">
      <label>メールアドレス</label>
      <input type="email" class="form-control" placeholder="メールアドレス" v-model="email">
    </div>
    <div class="form-group">
      <label>パスワード</label>
      <input type="password" class="form-control" placeholder="パスワード" v-model="password">
    </div>
    <div class="text-center pt-2">
    <button @click="login" class="btn btn-secondary">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import '@firebase/auth';

export default{
  layout(){
    return 'top_header'
  },
  data(){
    return{
      email:'',
      password:'',
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    }
  }
}
</script>

