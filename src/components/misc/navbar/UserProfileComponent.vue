<script>
import Button from 'primevue/button';
import Menu from 'primevue/menu';

export default {
  name: 'UserProfileComponent',
  data() {
    return {
      items: [
        {
          label: 'Documents',
          items: [
            {
              label: 'New',
              icon: 'pi pi-plus'
            },
            {
              label: 'Search',
              icon: 'pi pi-search'
            }
          ]
        },
        {
          label: 'Profile',
          items: [
            {
              label: 'Settings',
              icon: 'pi pi-cog'
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out'
            }
          ]
        }
      ]
    };
  },
    components: {
    Button,
    Menu
  },
  methods: {
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    }
  }
};

</script>

<template>

  <Button icon="pi pi-user" severity="info" rounded aria-label="User" @click="toggleMenu"/>
  <Menu ref="menu" :model="items" :popup="true" />

</template>