<template>
    <header class ="signUpHead text-white ">
      <h1 align= "center" class="mb-5">Crea tu cuenta</h1>

      <form data-toggle="validator" role="form">
        <div class="form-group container text-center">
          <label for="inputName" class="control-label">Nombres: </label>
          <input type="text" class="form-control" id="inputName" placeholder="Nombre" required>
        </div>

        <div class="form-group container text-center">
          <label for="inputLastName" class="control-label">Apellidos:</label>
          <input type="text" class="form-control" id="inputLastName" placeholder="Apellido" required>
        </div>


        <div class="form-group container text-center">
          <label for="inputEmail" class="control-label">Correo: </label>
          <input type="email" class="form-control" id="inputEmail" placeholder="Correo electrónico"  required>
          <div class="help-block with-errors"></div>
        </div>


        <div class="form-group container text-center">
          <label for="inputPassword" class="control-label">Contraseña: </label>
          <input type="password" data-minlength="6" class="form-control" id="inputPassword" placeholder="Contraseña"  required>
          <div class="help-block with-errors">Minimo 6 caracteres</div>
        </div>
        <div class="form-group container text-center">
          <label for="inputPasswordConfirm" class="control-label">Confirmar contraseña: </label>
          <input type="password" data-minlength="6" class="form-control" id="inputPasswordConfirm" placeholder="Confirmación"  required>
          <div class="help-block with-errors"></div>
        </div>
        <div class="form-group container text-center">
        <button type="submit" class="btn btn-primary" href = "/login" >Registrate</button>
        </div>
      </form>
    </header>
</template>

<script>
    export default {
        name: 'SignUp'
    }
</script>

<style scoped>
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }


    header.signUpHead {
        position: center;
        background: url('../assets/images/login.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 8rem;
        padding-bottom: 8rem;
    }
    img{
        margin-top: 10px;
        object-fit: scale-down;
        max-width: 100%;
    }
    .btn-margin-left {
        margin-left: 15px;
    }
    .signInInput {
        max-width: 1000px;
        margin: auto;
    }
</style>
