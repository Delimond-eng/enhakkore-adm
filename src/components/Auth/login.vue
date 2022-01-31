<template>
  <div>
    <section class="login-block">
      <!-- Container-fluid starts -->
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <!-- Authentication card start -->
            <form class="md-float-material form-material">
              <div class="text-center">
                <h6
                  class="font-weight-bolder text-lowercase my-2"
                  style="
                    font-size: 1.8em;
                    text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
                  "
                >
                  <span class="text-capitalize">En-</span
                  ><span class="text-capitalize">Hakkoré</span>
                </h6>
              </div>
              <div class="auth-box card">
                <div class="card-block">
                  <div class="row m-b-20">
                    <div class="col-md-12">
                      <h4
                        class="text-center font-weight-bolder text-primary text-uppercase"
                        style="
                          text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
                        "
                      >
                        Connexion
                      </h4>
                    </div>
                  </div>

                  <div class="form-group form-primary">
                    <input
                      v-model="user.email"
                      type="text"
                      name="email"
                      id="email"
                      class="form-control form-control-primary"
                      required
                      placeholder="Entrer l'adresse Email"
                    />
                    <span class="form-bar"></span>
                  </div>

                  <div class="form-group form-primary">
                    <input
                      v-model="user.pass"
                      type="password"
                      name="password"
                      id="pass"
                      class="form-control form-control-primary"
                      required
                      placeholder="Entrer le Mot de passe"
                    />
                    <span class="form-bar"></span>
                  </div>

                  <div class="row m-t-30">
                    <div class="col-md-12">
                      <button
                        @click.prevent="gobefore"
                        type="button"
                        id="login"
                        class="btn btn-primary btn-out btn-square btn-block btn-lg waves-effect waves-light text-center m-b-20"
                      >
                        <span id="loading"></span>
                        Connecter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <!-- end of form -->
          </div>
          <!-- end of col-sm-12 -->
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container-fluid -->
    </section>
    <!-- Warning Section Starts -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",

  data() {
    return {
      user: {
        email: "",
        pass: "",
      },
      token: "En-Hakkoré",
    };
  },
  methods: {
    gobefore() {
      this.$router.go(this.$router.push({ name: "admin" }));
    },
    getLoggedIn() {
      let loader = document.getElementById("loading");
      loader.classList.add("spinner-border");

      try {
        let options = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
        let formData = new FormData();
        formData.append("email", this.user.email);
        formData.append("password", this.user.pass);

        if (this.user.email === "" || this.user.pass === "") {
          this.$swal(
            "Désolé !",
            "vous devez entrer toutes les informations requises pour vous connectez!",
            "warning"
          );
          loader.classList.remove("spinner-border");
          return;
        } else {
          axios
            .post(
              "https://en-hakkore.rosepay.org/connexion/connexionUsers",
              formData,
              options
            )
            .then((res) => {
              let status = res.data.reponse.status;
              if (status === "success") {
                this.$swal("", "Bienvenu sur En-Hakkoré admin", "success");
                localStorage.setItem("aToken", this.token);
                this.$router.go(this.$router.push({ name: "admin" }));
                loader.classList.remove("spinner-border");
                return;
              } else {
                this.$swal("Désolé", "Vos identifiants sont erronés !", "warning");
                loader.classList.remove("spinner-border");
                return;
              }
            });
        }
      } catch (error) {
        console.log(error);
        loader.classList.remove("spinner-border");
      }
    },
  },
};
</script>
