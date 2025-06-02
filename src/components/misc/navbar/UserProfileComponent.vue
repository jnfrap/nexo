<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import { logout } from '@/shared/firebaseService';

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
              icon: 'pi pi-sign-out',
              command: async () => {
                await this.handleLogout();
              }
            }
          ]
        }
      ],
      settings: [
        'Cuenta',
        'Privacidad',
        'Idioma',
        'Tema',
        'Accesibilidad',
        'Seguridad',
        'Preferencias',
        'Soporte',
        'Acerca de'
      ],
      selectedSetting: null
    };
  },
  components: {
    Button,
    Menu,
    Dialog,
    Splitter,
    SplitterPanel
  },
  methods: {
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    openSettings() {
      this.dialogVisible = true;
    },
    async handleLogout() {
      try {
        await logout();
        this.$router.push('/auth');
      } catch (error) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cerrar sesión', life: 3000 });
        console.error(error);
      }
    }
  }
};

</script>

<template>
  <Button icon="pi pi-user" aria-label="User" @click="toggleMenu" class="bg-fuschia-100 !rounded-full"
    style="border: none;" />
  <Menu ref="menu" :model="items" :popup="true" />
  <Dialog v-model:visible="dialogVisible" position="full" modal :dismissableMask="true" header="Ajustes de Usuario"
    class="w-full max-w-4xl !bg-fuchsia-950 !text-white" style="border: none;">
    <div class="card">
      <Splitter style="height: 300px">
        <SplitterPanel class="flex items-center justify-center px-4" :size="25" :minSize="10">
          <ul class="space-y-2 w-full max-w-xs">
            <li v-for="setting in settings" :key="setting"
              class="text-fuchsia-900 font-semibold hover:text-fuchsia-700 cursor-pointer"
              @click="selectedSetting = setting">
              {{ setting }}
            </li>
          </ul>
        </SplitterPanel>
        <SplitterPanel class="flex items-center justify-center" :size="75">
          <div class="p-6">
            <div v-if="selectedSetting === 'Cuenta'">
              <h3 class="font-bold mb-2 ">Configuración de Cuenta</h3>
              <p>Actualiza tu información personal y credenciales.</p>
            </div>
            <div v-else-if="selectedSetting === 'Privacidad'">
              <h3 class="font-bold mb-2">Privacidad</h3>
              <p>Gestiona quién puede ver tu información y actividad.</p>
            </div>
            <div v-else-if="selectedSetting === 'Idioma'">
              <h3 class="font-bold mb-2">Idioma</h3>
              <p>Selecciona el idioma de la interfaz.</p>
            </div>
            <div v-else-if="selectedSetting === 'Tema'">
              <h3 class="font-bold mb-2">Tema</h3>
              <p>Elige entre modo claro u oscuro.</p>
            </div>
            <div v-else-if="selectedSetting === 'Accesibilidad'">
              <h3 class="font-bold mb-2">Accesibilidad</h3>
              <p>Opciones para mejorar la accesibilidad de la aplicación.</p>
            </div>
            <div v-else-if="selectedSetting === 'Seguridad'">
              <h3 class="font-bold mb-2">Seguridad</h3>
              <p>Configura la autenticación y otras opciones de seguridad.</p>
            </div>
            <div v-else-if="selectedSetting === 'Preferencias'">
              <h3 class="font-bold mb-2">Preferencias</h3>
              <p>Personaliza la experiencia de usuario.</p>
            </div>
            <div v-else-if="selectedSetting === 'Soporte'">
              <h3 class="font-bold mb-2">Soporte</h3>
              <p>Contacta al soporte o revisa preguntas frecuentes.</p>
            </div>
            <div v-else-if="selectedSetting === 'Acerca de'">
              <h3 class="font-bold mb-2">Acerca de</h3>
              <p>Información sobre la aplicación y el equipo de desarrollo.</p>
            </div>
            <div v-else>
              <h3 class="font-bold mb-2">Selecciona una opción</h3>
              <p>Elige un ajuste de la lista para ver los detalles.</p>
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  </Dialog>
</template>
