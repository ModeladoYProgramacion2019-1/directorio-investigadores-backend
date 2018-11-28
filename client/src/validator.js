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
      required: () => 'El apellido no puede estar vacío'
    },
    email: {
      email: function () {
        return "Email inválido. Por favor inténtalo de nuevo."
      },
      required: () => 'El email no puede estar vacío'

    },
    password: {
      required: () => 'La contraseña no puede estar vacía'

    },
    password_confirmation: {
      confirmed: function () {
        return "Las contraseñas no son iguales"
      },
        required: () => 'La confirmación de la contraseña no puede estar vacía'
    }

  }
};


Validator.localize('en', dict);
