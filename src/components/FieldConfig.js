import React from 'react';
const maxRow = 50;
const minRow = 1;
const maxCol = 50;
const minCol = 1;

const FieldConfig = ({rows = 1, columns = 1, numberOfBombs = 0, onConfigChange}) => {
  return (
    <div className="field-config">
      <div className="config">
        <input
          className="input-config"
          id="rows"
          type="number"
          value={rows}
          onChange={(e) => {
            let value = e.target.value;
            if(value > maxRow) value = maxRow;
            if(value < minRow) value = minRow;
            onConfigChange('rows', value);
          }}
        />
        <label className="label-config" htmlFor="rows">Rows</label>
      </div>
      <div className="config">
        <input
          className="input-config"
          id="columns"
          type="number"
          value={columns}
          onChange={(e) => {
            let value = Number(e.target.value);
            if(value > maxCol) value = maxRow;
            if(value < minCol) value = minRow;
            onConfigChange('columns', value);
          }}
        />
        <label className="label-config" htmlFor="columns">Columns</label>
      </div>
      <div className="config">
        <input
          className="input-config"
          id="bombs"
          type="number"
          value={numberOfBombs}
          onChange={(e) => onConfigChange('numberOfBombs', Number(e.target.value))}
        />
        <label className="label-config" htmlFor="bombs">Number of Bombs</label>
      </div>
    </div>
  );
};

export default FieldConfig;