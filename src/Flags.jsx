import React from "react";
import flags from "./data/flags.json";



function getValueByKey(object, key) {
  return Object.values(object).find((value) => object[value] === key);
}
const label = flags["in"]
function Flags() {
  return (
    <div>
      <label htmlFor="flags">flags</label>

      <select name="flags" id="flag">
        {Object.entries(flags).map(([val, label]) => {
          return (
            <option value={`https://flagcdn.com/${val}.svg`}>
              <span>
                <h1>{label}</h1>
              </span>
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Flags;
