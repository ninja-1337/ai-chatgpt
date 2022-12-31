import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

const AddTwoNumbers: React.FunctionComponent = () => {
  const [sum, setSum] = useState(0);
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "x") {
      setx(parseInt(e.target.value));
    } else if (e.target.name === "y") {
      sety(parseInt(e.target.value));
    }
  };

  useEffect(() => {
    return () => {
      setSum(x + y);
    };
  }, [x, y]);

  return (
    <div>
      <h1>Adding two numbers</h1>
      <form>
        <input type="number" name="x" onChange={handleChange} />
        <input type="number" name="y" onChange={handleChange} />
      </form>
      <p>
        The sum of {x} and {y} is {sum}
      </p>
      <Link href="/">Go Home</Link>
    </div>
  );
};

export default AddTwoNumbers;
