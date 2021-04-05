const Filter = ({ value, onChange }) => (
  <label>
    Name Filter
    <input type="text" value={value} onChange={onChange} />;
  </label>
);
export default Filter;
