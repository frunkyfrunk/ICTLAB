<template>
    <div>
        <h3>Step 1: Log In to your Trello account</h3>
        <div class="float-left">
            <button @click="settings()" type="button" class="btn btn-primary">Settings</button>
        </div>
        <div class="float-right">
            <button @click="authenticate()" id="loginButton" type="button" class="btn btn-primary">Log in</button>
        </div>
    </div>
</template>
<script>
export default {
  name: "stepone",
  methods: {
    authenticate() {
      let $self = this;
      window.Trello.authorize({
        type: "popup",
        name: "Userstory Analyzer",
        scope: {
          read: "true",
          write: "true"
        },
        expiration: "never",
        success: this.authenticationSuccess,
        error: this.authenticationFailure
      });
    },
    authenticationSuccess() {
      //   this.$swal({
      //     title: "Authentication Succeedded",
      //     timer: 1000,
      //     type: "success",
      //     showConfirmButton: false,
      //     });
      this.$emit("updateAnimation", true);
      this.$emit("updateLoading", true);
      window.setTimeout(x => {
        this.$emit("updateStep", 2);
      }, 1000);
    },
    authenticationFailure() {
      this.$swal("Authentication Failed");
    }
  }
};
</script>