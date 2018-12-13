import Vue from 'vue';
import SignUp from './views/SignUp.vue'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
import { Validator } from 'vee-validate';

const dict = {
  custom: {
    name: {
      required: () => 'El nombre no puede estar vacío.'
    },
    lastName: {
      required: () => 'El apellido no puede estar vacío.'
    },
    email: {
      email: function () {
        return "Email inválido. Por favor inténtalo de nuevo."
      },
      required: () => 'El email no puede estar vacío.'

    },
    password: {
      required: () => 'La contraseña no puede estar vacía.'

    },
    new_password: {
      required: () => 'La contraseña no puede estar vacía.'

    },
    password_confirmation: {
      confirmed: function () {
        return "Las contraseñas no son iguales."
      },
        required: () => 'La confirmación de la contraseña no puede estar vacía.'
    },

    field: {
      required: () => 'El campo no puede estar vacío.'
    },
    resume: {
      required: () => 'El currículum no puede estar vacío.'
    },
    biography: {
      required: () => 'La biografía no puede estar vacía.'
    },
    description: {
      required: () => 'La descripción no puede estar vacía.'
    },
    key: {
      length: function(){
        return "Se requiere un máximo de 5 caracteres."
      },
      required: () => 'La clave no puede estar vacía.'
    },
    state: {
      required: () => 'Se requiere elegir un estado.'
    },
    city: {
      required: () => 'Se requiere escribir una ciudad.'
    },
    town: {
      required: () => 'Se requiere escribir un municipio.'
    },
    suburb: {
      required: () => 'Se requiere escribir una colonia.'
    },
    PC: {
      numeric: function(){
        return "Formato inválido, intenta escribiendo números."
      },
      required: () => 'Se requiere escribir un código postal.'
    },
    street: {
      required: () => 'Se requiere escribir una calle.'
    },
    numE: {
      numeric: function(){
        return "Formato inválido, intenta escribiendo números."
      },
      required: () => 'Se requiere escribir una calle.'
    },
    building: {
      required: () => 'Se requiere escribir el nombre o número de edificio.'
    },
    floor: {
      required: () => 'Se requiere escribir el número de piso'
    },
    cubicle: {
      required: () => 'Se requiere escribir el número o nombre del cubículo'
    }



  }
};


Validator.localize('en', dict);
