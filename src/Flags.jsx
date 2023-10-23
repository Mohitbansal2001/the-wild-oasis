import React from "react";
import flags from "./data/flags.json";



function getKeyByValue(object, value) { 
  return Object.keys(object).find(key => 
      object[key] === value); 
} 
const ans = getKeyByValue(flags,"India")
// console.log(ans)

const label = flags["in"];
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
