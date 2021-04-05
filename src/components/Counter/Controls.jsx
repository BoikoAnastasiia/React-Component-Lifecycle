const Controls = ({ onIncrement, onDecrement }) => (
  <div className="Counter__controls">
    <button type="button" onClick={onIncrement}>
      Increase to 1
    </button>
    <button type="button" onClick={onDecrement}>
      Decrease to 1
    </button>
  </div>
);

export default Controls;
