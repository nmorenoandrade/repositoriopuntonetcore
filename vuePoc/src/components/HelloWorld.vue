<template>
<v-app id="inspire">
<div id="app">
  <div class="hello">
    <h1>{{ msg }}</h1> <br/>
    
     <v-btn
        :loading="loading2"
        :disabled="loading2"
        color="success"
        @click="callIt()"
        @click.native="loader = 'loading2'"
      >
        Response
        <span slot="loader">Loading...</span>
      </v-btn>
     <v-btn
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click.native="loader = 'loading'"
      @click="clean()"
    >
      Clean
    </v-btn>
    <h2>{{ respuesta }}</h2>  <br/>
  </div>
  </div>
   </v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Project POC',
      someData: 'some text',
      respuesta: '',
      loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false

    }
  },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 30)

        this.loader = null
      }
    },
  methods:{
    callIt: function(){
      
      this.respuesta='';
       var url = 'http://10.10.24.13:8081/poc/mensaje/pocRest';
       var queryString = require('querystring')
        var data = {            
             val : "1"
           };  
           
            this.$http.post(url,{val : "1"},
           {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response =>{
              //alert(JSON.stringify(response));
              
             if(response.ok){
const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
            this.respuesta = response.data.mensaje;
           // alert(this.respuesta);
              //this.datosToken = response.data.mensaje;
              //tokenGenerado = response.data.token;
              }
            })
            .catch(error => {
              alert(JSON.stringify(error));
            });
          
    },
    clean: function(){
      
      this.respuesta='';
      
          
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
