import React, { useState, useEffect } from 'react';

export default function Exchange() {
  const currencyOptions = ['USD 50-100', 'USD 5-20', 'USD 1', 'EUR', 'JPY', 'GBP', 'SGD', 'AUD', 'CHF', 'HKD', 'CAD', 'NZD', 'SEK', 'TWD', 'NOK', 'MYR', 'CNY', 'KRW']; // array of available currency options

  const [currency, setCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [exchangeAmount, setExchangeAmount] = useState(0);
  const [exchanges, setExchanges] = useState(() => {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const savedExchanges = localStorage.getItem('exchanges');
    return savedExchanges ? JSON.parse(savedExchanges) : [];
  }); // array to store the list of exchanges

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    console.log('Currency:', currency);
    console.log('Exchange Rate:', exchangeRate);
    console.log('Exchange Amount:', exchangeAmount);
    // you can add code here to process the form data, such as sending it to a server
    const exchangeResult = exchangeRate * exchangeAmount;
    const exchange = { currency, exchangeRate, exchangeAmount, exchangeResult };
    const updatedExchanges = [...exchanges, exchange];
    setExchanges(updatedExchanges); // add the new exchange to the list of exchanges
    localStorage.setItem('exchanges', JSON.stringify(updatedExchanges)); // store the updated list of exchanges in local storage
    setCurrency(''); // reset the currency input
    setExchangeRate(0); // reset the exchange rate input
    setExchangeAmount(0); // reset the exchange amount input
  };
  

  useEffect(() => {
    const savedExchanges = localStorage.getItem('exchanges');
    if (savedExchanges) {
      setExchanges(JSON.parse(savedExchanges));
      
    }
  }, []);

  return (
    <div className="container">
      <h1>Manage Exchange Money</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Currency:</label>
          <select className="form-control" name="currency" value={currency} onChange={(event) => setCurrency(event.target.value)}>
            <option value="">Select Currency</option>
            {currencyOptions.map((currency, index) => (
              <option key={index} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Exchange Rate:</label>
          <input type="number" className="form-control" name="exchangeRate" value={exchangeRate} onChange={(event) => setExchangeRate(event.target.value)} placeholder="Enter exchange rate" />
        </div>
        <div className="form-group">
          <label>Exchange Amount:</label>
          <input type="number" className="form-control" name="exchangeAmount" value={exchangeAmount} onChange={(event) => setExchangeAmount(event.target.value)} placeholder="Enter exchange amount" />
        </div>
        <button type="submit" className="btn btn-primary">Exchange</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Exchange Rate</th>
            <th>Exchange Amount</th>
            <th>Exchange Result (THB)</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange, index) => (
            <tr key={index}>
              <td>{exchange.currency}</td>
              <td>{exchange.exchangeRate}</td>
              <td>{exchange.exchangeAmount}</td>
              <td>{exchange.exchangeResult}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
