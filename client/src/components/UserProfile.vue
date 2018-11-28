<template>
  <div class = "UserProfile">
    <header class ="profileHead text-white text-center">
      <h1>¡Hola, nombre!</h1>
    </header>

    <div class=text-right>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-btn  href="#" v-b-toggle.accordion1 variant="secondary"> Editar perfil</b-btn>
      </b-card-header>
    </div>

    <div class="container">
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template slot="header">
          Administrar artículos
        </template>
        <template slot="lead">
          <button class=" btn btn-ligth float-left">Artículos</button>
        </template>
      </b-jumbotron>
    </div>

    <div>
      <div>
    <b-card-group>
        <b-card title="Date de alta"
                img-src="https://placekitten.com/g/300/450"
                img-alt="Img"
                img-top>
            <p class="card-text">
                <button <button class = "btn btn-ligth"> Investigador </button>
            </p>

        </b-card>
        <b-card title="Date de alta"
                img-src="https://placekitten.com/g/300/450"
                img-alt="Img"
                img-top>
            <p class="card-text">
                  <button class = "btn btn-ligth"> Estudiante</button>
            </p>

        </b-card>
        <b-card title="Date de alta"
                img-src="https://placekitten.com/g/300/450"
                img-alt="Img"
                img-top>
            <p class="card-text">
                <button class = "btn btn-ligth">Administrador</button>
            </p>
          </b-card>
        </b-card-group>

        <div class=text-right>
          <button class = "btn btn-link">Accede a página de administrador</button>
        </div>

      </div>
    </div>
  </div>
</template>


<style scoped>
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }


    header.profileHead {
        position: relative;
        background: url('../assets/images/login.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 5rem;
        padding-bottom: 2rem;
    }
    img{
        margin-top: 10px;
        object-fit: scale-down;
        max-width: 100%;
    }
    .btn-margin-left {
        margin-left: 15px;
    }
    .btn{
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
    .profileInput {
        max-width: 1000px;
        margin: auto;
    }




</style>
