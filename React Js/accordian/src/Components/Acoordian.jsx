import React, { useState } from 'react'
import faqDatas from '../data/faqdata'
import Question from './Question';

export default function Acoordian() {

    const [currentIndex, setCurrentIndex] = useState('a');

    

    return (
        <>
            <div class="faq">
                {
                    faqDatas.map((v, i) => {
                        return (
                            <Question key={i} v={v} i={i} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                        )
                    })
                }
            </div>
        </>
    )
}




// export default function Acoordian() {

//     const [currentIndex, setCurrentIndex] = useState('a');

//     const changeIndex = (index) => {
//         if(currentIndex == index){
//             setCurrentIndex(-1)
//         } else {
//             setCurrentIndex(index)
//         }
//     }

//     return (
//         <>
//             <div class="faq">
//                 {
//                     faqDatas.map((v, i) => {
//                         return (
//                             <div class="faqItem" key={i}>
//                                 <div class="faqQUEST" title="" onClick={ () => changeIndex(i) }>
//                                     <div>
//                                         <h1>{v.question}</h1>
//                                     </div>
//                                     <div class="icon">
//                                         {
//                                             currentIndex == i
//                                                 ?
//                                                 '-'
//                                                 :
//                                                 '+'
//                                         }
//                                     </div>
//                                 </div>
//                                 <div class={
//                                     currentIndex == i
//                                         ?
//                                         "faqANS addANS"
//                                         :
//                                         "faqANS"

//                                 }  >
//                                     <p>{v.answer}</p>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </>
//     )
// }
