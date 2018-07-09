<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Acceso al Sistema</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field prepend-icon="person" name="cuenta" label="Usuario" type="text" v-model="cuenta" :rules="nameRules" required></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Contraseña" id="password" type="password" v-model="password" :rules="passwordRules" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login" >Ingresar7777</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

        </v-layout>

      </v-container>

          <div align-center justify-center class="ui negative message" v-if="error !== null">
                     <p>{{ error}}</p>
          </div>

    </v-content>

  </v-app>
</template>

<script>
import Vue from 'vue'
import Fingerprint2 from 'fingerprintjs2'
Vue.use(Fingerprint2)

var fingerprint;

new Fingerprint2().get(function(result, components) {
    fingerprint = result;
})


  export default {

    data: () => ({
      error : null,
      valid: true,
      cuenta: '',
      nameRules: [
        (v) => !!v.trim() || 'Usuario es requerido'
      ],
      password: '',
      passwordRules: [
        (v) => !!v.trim() || 'Contraseña es requerida'
      ]

    }),
    methods: {
        login() {
           debugger;
       

          var url = 'http://10.10.24.13:8080/poc/mensaje/pocRest';

          var queryString = require('querystring')

           var data = {
             cuenta: this.cuenta,
             password : this.password,
             browserFingerprintDigest : fingerprint
           };

           this.$http.post(url, {val:"1"},
           {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response =>{
              debugger;
              //alert(JSON.stringify(response));
             if(response.ok && response.data.codigo == 1){
              this.$emit('loggedIn', response.data.token);
              }else{
                alert('No autenticado');
              }
            })
            .catch(error => {

              this.error = null;
              var msjError = error;

              if(error.ok){

                msjError = error.data.codigo + ' - ' + error.data.mensaje;

                this.error = JSON.stringify(msjError);
              }else{
                this.error = JSON.stringify(msjError);
              }
            });


           
        },

    },
     activated() {
       var elem = document.getElementsByClassName('content')[0];
       elem.setAttribute('style','padding : 0px;');
       this.cuenta = '';
       this.password = '';

     }
  }
</script>
