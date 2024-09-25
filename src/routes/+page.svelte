<script>
    import { goto } from '$app/navigation';
    let email = '';
    let password = '';
  
    function handleSubmit(event) {
      event.preventDefault();
      console.log("Email:", email, "Password:", password);
      goto('/home');

      // Aquí puedes agregar la lógica de autenticación
    }
  </script>
  
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md">
      <form on:submit={handleSubmit} class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            placeholder="Introduce tu email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            bind:value={password}
            required
            placeholder="Introduce tu contraseña"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  </div>
  