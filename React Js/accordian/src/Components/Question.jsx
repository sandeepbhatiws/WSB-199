import React from 'react'

export default function Question({ v, currentIndex, setCurrentIndex, i }) {

    const changeIndex = (index) => {
        if(currentIndex == index){
            setCurrentIndex(-1)
        } else {
            setCurrentIndex(index)
        }
    }
    
    return (
        <>
            <div class="faqItem">
                <div class="faqQUEST" title="" onClick={() => changeIndex(i)}>
                    <div>
                        <h1>{v.question}</h1>
                    </div>
                    <div class="icon">
                        {
                            currentIndex == i
                                ?
                                '-'
                                :
                                '+'
                        }
                    </div>
                </div>
                <div class={
                    currentIndex == i
                        ?
                        "faqANS addANS"
                        :
                        "faqANS"

                }  >
                    <p>{v.answer}</p>
                </div>
            </div>
        </>
    )
}
