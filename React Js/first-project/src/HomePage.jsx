import { useState } from "react";

export default function HomePage() {

  var [counter, setCounter] = useState(5);

  const updateCounter = () => {
    counter++;
    console.log(counter)
    setCounter(counter)
  }

  return (
    <>
      <div>

        <button onClick={ updateCounter }>{counter}</button>    

      </div>
    </>
  )
}
