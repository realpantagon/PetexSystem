import React, { useState } from 'react';

function Dropdown() {
  const options = ['USD 50-100', 'USD 5-20', 'USD 1', 'EUR', 'JPY', 'GBP', 'SGD', 'AUD', 'CHF', 'HKD', 'CAD', 'NZD', 'SEK', 'TWD', 'NOK', 'MYR', 'CNY', 'KRW'];
  const [selectedOption, setSelectedOption] = useState('');
  const [rate, setRate] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Buying');
  const [data, setData] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInput1Change = (event) => {
    setRate(event.target.value);
  };

  const handleInput2Change = (event) => {
    setAmount(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleAddClick = () => {
    const newData = {
      currency: selectedOption,
      rate,
      amount,
      type,
      total: type === 'Buying' ? rate * amount : -(rate * amount)
    };
    setData([...data, newData]);
    setSelectedOption('');
    setRate('');
    setAmount('');
  };

  const handleClearClick = () => {
    setData([]);
  };

  return (
    <div>
        <label className='Header'>PETEX DATA</label>
      <div className='inputcontainer'>
      <label htmlFor="rate" className='currency'>Currency : </label>
        <select value={selectedOption} onChange={handleOptionChange} className='select'>
          <option value="">Select a Currency</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor="rate" className='rate'>Rate : </label>
        <input id="rate" type="text" value={rate} onChange={handleInput1Change} className='inrate'/>
        <label htmlFor="amount" className='amount'>Amount : </label>
        <input id="amount" type="text" value={amount} onChange={handleInput2Change} className='inamount'/>
        <select value={type} onChange={handleTypeChange} className='type'>
          <option value="Buying">Buying</option>
          <option value="Selling">Selling</option>
        </select>
        <button onClick={handleAddClick} className='addButton'>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.currency}</td>
              <td>{item.rate}</td>
              <td>{item.amount}</td>
              <td>{item.type}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='Summary'>
        <p className='total'>Total : </p>
        <p className='totaldata'>{data.reduce((acc, item) => acc + item.total, 0)} </p>
      </div>
      <button onClick={handleClearClick} className='clearButton'>Clear</button>
    </div>
  );
}

export default Dropdown;
