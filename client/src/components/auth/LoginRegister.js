import React from 'react'

function LoginRegister() {
    return (
        <div class="bg-grey-lighter h-screen font-sans">
  <div class="container mx-auto h-full flex justify-center items-center">
    <div class="w-1/3">
      <h1 class="font-hairline mb-6 text-center">Login to our Website</h1>
      <div class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
        <div class="mb-4">
          <label class="font-bold text-grey-darker block mb-2">Username or Email</label>
          <input type="text" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Username" />
        </div>

        <div class="mb-4">
          <label class="font-bold text-grey-darker block mb-2">Password</label>
          <input type="text" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Password" />
        </div>

        <div class="flex items-center justify-between">
          <button class="bg-blue-50 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded">Login</button>
        </div>
      </div>
      <div class="text-center">
        <p class="text-grey-dark text-sm">Don't have an account? <a href="#" class="no-underline text-blue font-bold">Create an Account</a>.</p>
      </div>
    </div>
  </div>
</div>



    )
}

export default LoginRegister
