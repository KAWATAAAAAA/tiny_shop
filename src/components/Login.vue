<template>
  <div class="container">
    <h1 style="font-family: 'consolas' ">Welcome to back</h1>
    <div class="form-head">
      <h2>Every Day，乐在分享</h2>
      <h2><a href="">立即登陆</a></h2>
    </div>
    <form action="" method="post" class="regiest-area">
      <div class="form-group">

        <input type="text" id="user-account-num" class="form-control" name="userAccountNum" placeholder="手机号/邮箱"
               data-toggle="tooltip" data-placement="bottom" title="昵称由1-10个字符组成">
        <div class="input-ok"></div>
      </div>
      <div class="form-group">

        <input type="password" id="user-password" class="form-control" name="userPassword" placeholder="密码" data-toggle="tooltip"
               data-placement="bottom" title="密码由6-12位数字、字母或特殊字符组成,不能包含空格">
        <div class="eye-close" id="eye"></div>
        <div class="input-ok"></div>
      </div>
      <div class="form-group">

        <input type="submit" id="submit" class="btn btn-primary" value="登陆" disabled="disabled" title="请先填入所需信息">
      </div>

    </form>
  </div>
</template>

<script>

  import '../assets/js/login_regiest_form_check'
  export default {
    name: 'Login'
  }
</script>

<style src="../assets/css/login_regiest_style.css" />
<style scoped>

</style>
