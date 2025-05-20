<template>
    <div class="flex justify-center items-center h-screen bg-fuchsia-200">
        <div class="bg-fuchsia-950 text-white p-4 rounded-xl w-xl">
            <div class="py-8">
                <h1 class="text-2xl font-bold">Registrarse</h1>
            </div>
            <div class="bg-white text-black p-6 rounded-xl flex flex-col items-start space-y-2">
                <input v-model="email" class="w-full border border-slate-300 rounded-lg p-4 text-md" type="email"
                    placeholder="email">
                <input v-model="password" class="w-full border border-slate-300 rounded-lg p-4 text-md" type="password"
                    placeholder="contraseña">
                <div class="flex justify-center w-full">
                    <button @click="register"
                        class="bg-fuchsia-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-fuchsia-900 transition-all">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>