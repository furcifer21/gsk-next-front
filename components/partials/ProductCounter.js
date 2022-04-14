import React, {useState} from "react";

export default function ProductCounter() {
    const [count, setCount] = useState(1)

    return (
        <div className="number" data-step="1" data-min="1" data-max="100">
            <div className="number-minus" onClick={() => count > 0 && setCount(count - 1)}>−</div>
            <input className="number-text"
                   type="number"
                   name="count"
                   value={count}
                   readOnly
            />
            <div className="number-plus" onClick={() => setCount(count + 1)}>+</div>
        </div>
    )
}