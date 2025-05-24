<script>
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';

export default {
  name: 'UserProfileComponent',
  data() {
    return {
      dialogVisible: false,
      items: [
        {
          label: 'Perfil',
          items: [
            {
              label: 'Ajustes',
              icon: 'pi pi-cog',
              command: () => { this.openSettings(); }
            },
            {
              label: 'Cerrar sesión',
              icon: 'pi pi-sign-out'
            }
          ]
        }
      ]
    };
  },
  components: {
    Button,
    Menu,
    Dialog

  },
  methods: {
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    openSettings() {
      this.dialogVisible = true;
    }
  }
};

</script>

<template>
  <Button icon="pi pi-user" aria-label="User" @click="toggleMenu" class="bg-fuschia-100 !rounded-full"
    style="border: none;" />
  <Menu ref="menu" :model="items" :popup="true" />
  <Dialog v-model:visible="dialogVisible" position="full" modal :dismissableMask="true" header="Ajustes de Usuario">
    <ul class="space-y-2 p-4">
      <li class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer">Cuenta</li>
      <li class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer">Privacidad</li>
      <li class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer">Idioma</li>
      <li class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer">Tema</li>
      <li class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer">Accesibilidad</li>
      <li class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer">Seguridad</li>
      <li class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer">Preferencias</li>
      <li class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer">Soporte</li>
      <li class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer">Acerca de</li>
    </ul>
  </Dialog>
</template>
