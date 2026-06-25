"use client";

import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function Accordion() {

  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question:
        "Morbi gravida, nisi id fringilla ultricies, elit lorem ipsum?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },

    {
      question:
        "Aenean elit orci, efficitur quis nisl al, accumsan?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },

    {
      question:
        "Aenean elit orci, efficitur quis nisl al, accumsan?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },

    {
      question:
        "Pellentesque habitant morbi tristique senectus et netus?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },

    {
      question:
        "Nam pellentesque aliquam metus?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },

    {
      question:
        "Aenean elit orci, efficitur quis nisl al?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-[1320px] mx-auto px-4">

        <div className="space-y-3">

          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border transition-all duration-300 overflow-hidden
              ${
                openIndex === index
                  ? "border-[#d4ab74]"
                  : "border-[#ececec]"
              }`}
            >

              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex items-center justify-between px-4 md:px-5 py-4 transition-all duration-300
                ${
                  openIndex === index
                    ? 
                    "bg-#F2F2F2"
                    : 
                    "bg-[#f7f7f7]"
                }`}
              >

                <h2
                  className={`text-[14px] md:text-[15px] font-semibold leading-normal text-left
                  ${
                    openIndex === index
                      ? 
                      "text-[#d4ab74]"
                      : 
                      "text-black"
                  }`}
                >
                  {item.question}
                </h2>

                <span
                  className={`text-[18px]
                  ${
                    openIndex === index
                      ? "text-[#d4ab74]"
                      : "text-[#bcbcbc]"
                  }`}
                >
                  {openIndex === index ? <FiMinus /> : <FiPlus />}
                </span>

              </button>

              <div
                className={`transition-all duration-300 overflow-hidden
                ${
                  openIndex === index
                    ? "max-h-[200px] opacity-100 "
                    : "max-h-0 opacity-0"
                }`}
              >

                <div className="px-4 md:px-5 py-4 bg-white">
                  <p className="text-[14px] leading-7 text-[#666]">
                    {item.answer}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}