import React from 'react'

function OtpVerify() {
    return (
        <div>
            <div className="bg-grey-lighter h-screen font-sans">
  <div className="container mx-auto h-full flex justify-center items-center">
    <div className="w-1/3">
      <h1 className="font-hairline mb-6 text-center">Login to our Website</h1>
      <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="font-bold text-grey-darker block mb-2">Enter OTP</label>
          <input type="text" className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="One Time Password" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-50 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded">Login</button>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    )
}

export default OtpVerify;
