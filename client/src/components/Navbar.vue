<template>
    <nav class="navbar navbar-light  sticky-top ">
      <div class="container">
        <a class="navbar-brand" href="/">Red Nacional de Investigación</a>
        <div class="form-inline">

            <input class="form-control mr-sm-2"
                   type="search"
                   placeholder="¿Que está buscando?"
                   aria-label="Search"
                   v-model="searchTerm">

             <router-link :to="{name : 'Results', query : { busqueda: searchTerm } }">
                     <a class="btn btn-secondary" href="#">Buscar</a>
             </router-link>

            <router-link to="/busqueda">
                <a class="btn btn-secondary" href="#">Búsqueda avanzada</a>
            </router-link>

            <router-link to="/login">
                <button v-if="!isLoggedIn"
                        class="btn btn-primary btn-margin-left">
                    Acceder
                </button>
            </router-link>

            <router-link :to="{name : 'Profile', params : { id: person_id } }">
                <button v-if="isLoggedIn"
                        class="btn btn-info btn-margin-left">
                    Mi perfil
                </button>
            </router-link>
            <button v-if="isLoggedIn"
                    class="btn btn-primary btn-margin-left"
                    @click="logOut">
                Salir
            </button>
        </div>
      </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar',
        data: function () {
          return {
            isLoggedIn : false,
            person_id  : null,
            searchTerm : ""
          }
        },
        methods : {
            getCookieInfo(){
                var user = null
                user = JSON.parse(this.$cookie.get('user'))
                if (user != null) {
                    this.isLoggedIn = true
                    this.person_id = user.persona_id;
                }
            },
            logOut(){
                this.$cookie.delete('user')
                this.$router.push({ name: 'home'})
            },
            performSimpleSearch(){
                let me = this;
                console.log("SEARCHING FOR: "+me.searchTerm);
            }
        },
        mounted () {
            this.getCookieInfo()
        }
    }
</script>

<style scoped>
    nav {
        background-color: rgba(250, 250, 250, 0.88);
    }
    .btn{
        margin-right: 5px;
    }
    .form-control{
        margin-bottom : 5px;
        margin-top : 5px;
    }
</style>
