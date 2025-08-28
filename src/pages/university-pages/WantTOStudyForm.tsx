import React from "react";

const WantTOStudyForm = () => {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border rounded-lg px-3 py-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded-lg px-3 py-2"
        required
      />
      <input
        type="tel"
        placeholder="Mobile"
        className="w-full border rounded-lg px-3 py-2"
        required
      />
      <input
        type="text"
        placeholder="City"
        className="w-full border rounded-lg px-3 py-2"
        required
      />
      <select className="w-full border rounded-lg px-3 py-2" required>
        <option value="">Preferred Destination</option>
        <option value="usa">USA</option>
        <option value="uk">UK</option>
        <option value="canada">Canada</option>
        <option value="australia">Australia</option>
      </select>
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
      >
        Submit
      </button>
    </form>
  );
};

export default WantTOStudyForm;
