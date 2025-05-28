<template>
    <div>
        <AppButton icon="pi pi-bell" class="p-button-text p-button-rounded mr-2" aria-label="Notificaciones"
            @click="op.toggle($event)" ref="btn" />
        <OverlayPanel ref="op" :dismissable="true" style="width: 300px">
            <div class="p-3">
                <h3 class="text-lg font-bold mb-2">Notificaciones</h3>
                <ul class="space-y-2">
                    <li v-for="(note, index) in notifications" :key="index"
                        class="bg-fuchsia-100 text-fuchsia-900 rounded-lg p-3 shadow-sm">
                        {{ note }}
                    </li>
                    <li v-if="notifications.length === 0" class="text-gray-500 italic">No hay notificaciones</li>
                </ul>
            </div>
        </OverlayPanel>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from 'primevue/button'
import OverlayPanel from 'primevue/overlaypanel'


const op = ref(null)


const notifications = [
    '¡Bienvenido a Nexo!',
    'Tienes 3 tareas pendientes',
    'Nuevo comentario en tu post'
]
</script>
