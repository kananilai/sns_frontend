<template>
  <div class="col-5 mx-auto border rounded p-3 mt-5">
    <div class="form-group">
      <label>ユーザーネーム</label>
      <input type="text" class="form-control" placeholder="ユーザーネーム" v-model="user_name">
    </div>
    <div class="form-group">
      <label>メールアドレス</label>
      <input type="email" class="form-control" placeholder="メールアドレス" v-model="email">
    </div>
    <div class="form-group">
      <label>パスワード</label>
      <input type="password" class="form-control" placeholder="パスワード" v-model="password">
    </div>
    <div class="text-center pt-2">
    <button @click="register()" class="btn btn-secondary">新規登録</button>
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
      user_name:'',
      email:'',
      password:''
    };
  },
  methods: {
    register() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          const sendData = {
            uid: data.user.uid,
            email:this.email,
            name: this.user_name,
            password:this.password
          };
          console.log(sendData);
          this.$axios.post("http://127.0.0.1:8000/api/register", sendData);
          this.$router.replace("/login");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/email-already-in-use":
              alert("このメールアドレスはすでに使われています。");
              break;
            case "auth/weak-password":
              alert("パスワードは6文字以上で入力してください。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
    },
  },
}
</script>

