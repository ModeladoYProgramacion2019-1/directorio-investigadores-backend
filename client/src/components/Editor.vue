<template>
  <div class="FieldSearch">
    <header class ="editor text-white text-center">
      <h1 class="mb-3">Editar perfil</h1>
    </header>


    <div>
      <b-card no-body>
        <b-tabs pills card vertical nav-wrapper-class="w-40">
          <b-tab title="Información personal" active>

            <div class="text-left mb-3">
              <h3>Información personal</h3>
              <h5>Edita o actualiza tu Información personal</h5>
              <hr>
            </div>


            <div class = "text-left mb-2">
              <label class="control-label">Nombre</label>
              <input v-validate="'required'" name="name" type="text" class="form-control col-sm-5" value="NOMBRE" ref="name">
              <span style="color:red">{{ errors.first('name') }}</span>
            </div>

            <div class = "text-left mb-2">
              <label class="control-label">Apellido</label>
              <input v-validate="'required'" name="lastName" type="text" class="form-control col-sm-5" value="APELLIDO" ref="name">
              <span style="color:red">{{ errors.first('lastName') }}</span>
            </div>

            <div class = "text-left mb-2">
              <label class="control-label">Correo electrónico</label>
              <input v-validate = "'required|email'"  name= "email" type="text" class="form-control col-sm-5"  value="EMAIL@EXAMPLE.COM">
              <span style="color:red">{{ errors.first('email') }}</span>
            </div>

            <div class = "text-left mb-2">
              <label class="control-label">Campo</label>
              <input v-validate = "'required'"  name= "field" type="text" class="form-control col-sm-5"  value="CAMPO">
              <span style="color:red">{{ errors.first('field') }}</span>
            </div>

            <div class = "text-left mb-2">
              <label class="control-label">Biografía</label>
              <textarea v-validate = "'required'"  name= "biography" type="text" class="form-control col-sm-5" > BIOGRAFÍA </textarea>
              <span style="color:red">{{ errors.first('biography') }}</span>
            </div>

            <div class = "text-left mb-2">
              <label class="control-label">Currículum</label>
              <textarea v-validate = "'required'"  name= "resume" type="text" class="form-control col-sm-5" > CURRICULUM </textarea>
              <span style="color:red">{{ errors.first('resume') }}</span>
            </div>


            <div class = "text-left">
              <button type="button" class="btn btn-primary">Guardar cambios</button>
            </div>

          </b-tab>


          <b-tab title="Información institución">
            <div class="text-left mb-3">
              <h3>Información institución</h3>
              <h5>Edita o actualiza la información de la institución</h5>
              <hr>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Nombre de la institución</label>
              <input v-validate="'required'" name="name" type="text" class="form-control col-sm-5" value="NOMBRE" ref="name_institution">
              <span style="color:red">{{ errors.first('name') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Descripción de la institución</label>
              <input v-validate="'required'" name="description" type="text" class="form-control col-sm-5" value="DESCRIPCION" >
              <span style="color:red">{{ errors.first('description') }}</span>
            </div>


            <div class = "text-left container mb-2">
              <label class="control-label">Clave de la institución</label>
              <input v-validate="'required|length:5'" name="key" type="text" class="form-control col-sm-5" value="CLAVE" >
              <span style="color:red">{{ errors.first('key') }}</span>
            </div>

            <div class = "text-left">
              <button type="button" class="btn btn-primary">Guardar cambios</button>
            </div>

          </b-tab>

          <b-tab title="Información sede">

            <div class="text-left mb-3">
              <h3>Información sede </h3>
              <h5>Edita o actualiza la de la sede</h5>
              <hr>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Nombre de la sede</label>
              <input v-validate="'required'" name="name" type="text" class="form-control col-sm-5" value="NOMBRE" ref="name_institution">
              <span style="color:red">{{ errors.first('name') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Descripción de la sede</label>
              <input v-validate="'required'" name="description" type="text" class="form-control col-sm-5" value="DESCRIPCION" >
              <span style="color:red">{{ errors.first('description') }}</span>
            </div>


            <div class = "text-left container mb-2">
              <label class="control-label">Clave de sede</label>
              <input v-validate="'required|length:5'" name="key" type="text" class="form-control col-sm-5" value="CLAVE" >
              <span style="color:red">{{ errors.first('key') }}</span>
            </div>


            <div class = "text-left container mb-2">
              <label class="control-label">Estado</label>
              <select class="form-control" name = "state">
                <option>Aguascalientes</option>
                <option>Baja California</option>
                <option>Baja California Sur</option>
                <option>Campeche</option>
                <option>Chiapas</option>
                <option>Chihuahua</option>
                <option>Coahuila</option>
                <option>Colima</option>
                <option>Durango</option>
                <option>Guanajuato</option>
                <option>Guerrero</option>
                <option>Hidalgo</option>
                <option>Jalisco</option>
                <option>México</option>
                <option>Michoacán</option>
                <option>Morelos</option>
                <option>Nayarit</option>
                <option>Nuevo León</option>
                <option>Oaxaca</option>
                <option>Puebla</option>
                <option>Querétaro </option>
                <option>Quintana Roo</option>
                <option>San Luis Potosí</option>
                <option>Sinaloa</option>
                <option>Sonora</option>
                <option>Tabasco</option>
                <option>Tamaulipas</option>
                <option>Tlaxcala</option>
                <option>Veracruz</option>
                <option>Yucatán</option>
                <option>Zacatecas</option>
              </select>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Ciudad</label>
              <input v-validate = "'required|'" name= "city" class="form-control col-sm-5"  value="CIUDAD" >
              <span style="color:red">{{ errors.first('city') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Municipio</label>
              <input v-validate = "'required|'"  name= "town" type="text" class="form-control col-sm-5"  value="MUNICIPIO"  required>
              <span style="color:red">{{ errors.first('town') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label  class="control-label">Colonia</label>
              <input v-validate = "'required|'"  name= "suburb" type="text" class="form-control col-sm-5"  value="COLONIA">
              <span style="color:red">{{ errors.first('suburb') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label  class="control-label">Código postal</label>
              <input v-validate = "'required|numeric'"  name= "PC" type="text" class="form-control col-sm-5"  value="1000"  required>
              <span style="color:red">{{ errors.first('PC') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Calle</label>
              <input v-validate = "'required'"  name= "street" type="text" class="form-control col-sm-5"  value="CALLE"  required>
              <span style="color:red">{{ errors.first('street') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label  class="control-label">Número exterior</label>
              <input v-validate = "'required|numeric'"  name= "numE" type="text" class="form-control col-sm-5"  value="1"  required>
              <span style="color:red">{{ errors.first('numE') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Número interior</label>
              <input name= "num_int" type="text" class="form-control col-sm-5"  value="1"  required>

            </div>

            <div class = "text-left container mb-2">
              <label  class="control-label">Edificio</label>
              <input v-validate = "'required'"  name= "building" type="text" class="form-control col-sm-5"  value="EDIFICIO"  required>
              <span style="color:red">{{ errors.first('building') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Piso</label>
              <input v-validate = "'required'"  name= "floor" type="text" class="form-control col-sm-5"  value="PISO"  required>
              <span style="color:red">{{ errors.first('floor') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label class="control-label">Cubículo</label>
              <input v-validate = "'required'"  name= "cubicle" type="text" class="form-control col-sm-5"  value="CUBICULO"  required>
              <span style="color:red">{{ errors.first('cubicle') }}</span>
            </div>

            <div class = "text-left">
              <button type="button" class="btn btn-primary">Guardar cambios</button>
            </div>
          </b-tab>




          <b-tab  href="#/password" title="Contraseña">

            <div class="text-left mb-3">
              <h3>Contraseña</h3>
              <h5>Cambia o recupera tu contraseña actual</h5>
              <hr>
            </div>

            <div class="form-group container text-left">
              <label class="control-label">Contraseña actual</label>
              <input v-validate="'required'" name="new_password" type="password" class="form-control col-sm-5"  ref="new_password">
              <span style="color:red">{{ errors.first('new_password') }}</span>
              <a href="#"  role="button" >¿Olvidaste tu contraseña?</a>

            </div>


            <div class="form-group container text-left">
              <label class="control-label">Nueva contraseña</label>
              <input v-model = "password"v-validate="'required'" name="password" type="password" class="form-control col-sm-5"  ref="password">
              <span style="color:red">{{ errors.first('password') }}</span>
            </div>

            <div class="form-group container text-left">
              <label class="control-label">Confirmar contraseña</label>
              <input  v-validate="'required|confirmed:password'" name="password_confirmation" type="password" class="form-control col-sm-5" data-vv-as="password">
              <span style="color:red">{{ errors.first('password_confirmation') }}</span>
            </div>

            <div class = "text-left">
              <button type="button" class="btn btn-primary">Guardar cambios</button>
            </div>

          </b-tab>

          <b-tab title="Información de estudiante" active>
            <div class="text-left mb-3">
              <h3>Información de estudiante</h3>
              <h5>Edita o actualiza tu información como estudiante</h5>
              <hr>
            </div>

            <div class="form-group container text-left">
              <label class="control-label">Máximo grado de estudios</label>
              <input  v-validate="'required'" name="studies" type="text" class="form-control col-sm-5">
              <span style="color:red">{{ errors.first('studies') }}</span>
            </div>

            <div class="form-group container text-left">
              <label class="control-label">Nivel que se está estudiando</label>
              <input  v-validate="'required'" name="studiesA" type="text" class="form-control col-sm-5">
              <span style="color:red">{{ errors.first('studiesA') }}</span>
            </div>

            <div class="form-group container text-left">
              <label class="control-label">Fecha de graduación</label>
              <input  v-validate="'required|date_format:DD-MM-YYYY'" name="date" type="text" class="form-control col-sm-5">
              <span style="color:red">{{ errors.first('date') }}</span>
            </div>

          </b-tab>

          <b-tab title="Información de investigador" active>
            <div class="text-left mb-3">
              <h3>Información de investigador</h3>
              <h5>Edita o actualiza tu información como investigador</h5>
              <hr>
            </div>

            <div class="form-group container text-left">
              <label class="control-label">Máximo grado de estudios</label>
              <input  v-validate="'required'" name="studies" type="text" class="form-control col-sm-5">
              <span style="color:red">{{ errors.first('studies') }}</span>
            </div>

            <div class="form-group container text-left">
              <label class="control-label">Nivel que se está estudiando</label>
              <input  v-validate="'required'" name="studiesA" type="text" class="form-control col-sm-5">
              <span style="color:red">{{ errors.first('studiesA') }}</span>
            </div>

            <div class="form-group container text-left">
              <label class="control-label">Fecha de graduación</label>
              <input  v-validate="'required|date_format:DD-MM-YYYY'" name="date" type="text" class="form-control col-sm-5">
              <span style="color:red">{{ errors.first('date') }}</span>
            </div>

          </b-tab>


        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>


export default {
    name: 'Editor'

  }
</script>

<style scoped>

    h3{
      font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 500;
  ;
    }
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 200;
    }
    header.editor {
        position: relative;
        background: url('../assets/images/editor.jpg') no-repeat center center;
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

    .bar{
        background-color: #69747D;
        height: 60px;
        width: 100%;
    }
    .btn{
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
