import React, { useState } from 'react'

export default function ShowHidePassword() {

    const [type, setType] = useState('password');

    const changePassword = () => {
        if(type == 'password'){
            setType('text');
        } else {
            setType('password');
        }
    }

  return (
    <div>
      <input type={ type }/>

      <button onClick={changePassword} >{ type == 'text' ? 'Hide Password' : 'Show Password' }    </button>
    </div>
  ) 
}





// import React, { useState } from 'react'

// export default function ShowHidePassword() {

//     const [show, setShow] = useState(1);

//     const changePassword = () => {
//         // if(show == 1){
//         //     setShow(0);
//         // } else {
//         //     setShow(1);
//         // }

//         setShow(!show);
//     }

//   return (
//     <div>
//       <input type={ show == 1 ? 'text' : 'password' }/>

//       <button onClick={changePassword} >{ show == 1 ? 'Hide Password' : 'Show Password' }    </button>
//     </div>
//   ) 
// }
