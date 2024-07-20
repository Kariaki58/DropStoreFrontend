export default function SettingsForm() {
    return (
        <div>
             <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
     <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-white">First Name</label>
        <input type="text" id="firstName" className="mt-1 bg-[#374151]  w-full px-3 py-1 rounded-md" />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-white">Last Name</label>
        <input type="text" id="lastName" className="mt-1 bg-[#374151] w-full px-3 py-1 rounded-md" />
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-white">Country</label>
        <input type="text" id="country" className="mt-1 bg-[#374151]  w-full px-3 py-1 rounded-md" />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-white">City</label>
        <input type="text" id="city" className="mt-1 bg-[#374151]  w-full px-3 py-1 rounded-md" />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-white">Address</label>
        <input type="text" id="address" className="mt-1 bg-[#374151]  w-full px-3 py-1 rounded-md" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
        <input type="email" id="email" className="mt-1 bg-[#374151]  w-full px-3 py-1 rounded-md" />
      </div>

       <div>
        <label htmlFor="phone" className="block text-sm font-medium text-white">Phone Number</label>
        <input type="tel" id="phone" className="mt-1 bg-[#374151] w-full px-3 py-1 rounded-md" />
      </div>

       <div>
        <label htmlFor="birth" className="block text-sm font-medium text-white">Birthday</label>
        <input type="date" id="birth" className="mt-1 bg-[#374151]  w-full px-3 py-1 rounded-md" />
      </div>

       <div>
        <label htmlFor="organization" className="block text-sm font-medium text-white">Organization</label>
        <input type="text" id="organization" className="mt-1 bg-[#374151]  w-full px-3 py-1 rounded-md" />
      </div>

       <div>
        <label htmlFor="zip" className="block text-sm font-medium text-white">Zip/Code</label>
        <input type="text" id="zip" className="mt-1 bg-[#374151]  w-full px-3 py-1 rounded-md" />
      </div>

    </div>

    </form>
        </div>
    );
}