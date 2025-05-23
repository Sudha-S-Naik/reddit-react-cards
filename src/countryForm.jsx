import React, { useEffect, useState } from "react";

export default function CountryStateForm() {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: selectedCountry })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data && data.data.states) {
            setStates(data.data.states.map((s) => s.name));
          } else {
            setStates([]);
          }
        });
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    const selected = countries.find(c => c.name.common === e.target.value);
    setSelectedCountry(selected.name.common);
    setCountryCode(selected.cca2);
    setSelectedState("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      name,
      country: selectedCountry,
      countryCode,
      state: selectedState
    };
    setSubmittedData([...submittedData, newEntry]);
    setName("");
    setSelectedCountry("");
    setCountryCode("");
    setSelectedState("");
    setStates([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-10 space-y-10">
        <h1 className="text-3xl font-bold text-center text-blue-700">Country & State Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mx-3 mb-2  text-base font-medium text-gray-700">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className=" mx-2 w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm" placeholder="Enter your name" required />
          </div>

          <div className="flex flex-col">
            <label className="mx-3 mb-2 text-base font-medium text-gray-700">Country</label>
            <select value={selectedCountry} onChange={handleCountryChange} className=" mx-2 w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm" required>
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.cca2} value={country.name.common}>{country.name.common}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mx-3 mb-2 text-base font-medium text-gray-700">Country Code</label>
            <input type="text" value={countryCode} readOnly className=" mx-2 w-full border border-gray-300 px-4 py-3 rounded-md bg-gray-100 text-gray-700 shadow-sm" />
          </div>

          <div className="flex flex-col">
            <label className="mx-3 mb-2 text-base font-medium text-gray-700">State</label>
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className=" mx-2 w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm" required>
              <option value="">Select a state</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition shadow-md font-semibold">Submit</button>
        </form>

        {submittedData.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Submitted Entries</h2>
            <ul className="space-y-4">
              {submittedData.map((entry, index) => (
                <li key={index} className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <p><strong className="text-gray-700">Name:</strong> {entry.name}</p>
                  <p><strong className="text-gray-700">Country:</strong> {entry.country}</p>
                  <p><strong className="text-gray-700">Country Code:</strong> {entry.countryCode}</p>
                  <p><strong className="text-gray-700">State:</strong> {entry.state}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
