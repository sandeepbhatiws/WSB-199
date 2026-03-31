const faqDatas = [
  {
    id: 1,
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces using reusable components. It uses a virtual DOM to efficiently update the UI."
  },
  {
    id: 2,
    question: "What is JSX?",
    answer: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code inside JavaScript. It gets compiled to regular JavaScript function calls."
  },
  {
    id: 3,
    question: "What are props in React?",
    answer: "Props are arguments passed into React components, similar to function parameters. They are read-only and help pass data from parent to child components."
  },
  {
    id: 4,
    question: "What is state in React?",
    answer: "State is a built-in React object used to contain data that may change over the lifetime of the component. Unlike props, state is managed within the component and can be modified."
  },
  {
    id: 5,
    question: "What is the difference between state and props?",
    answer: "Props are used to pass data from parent to child, while state is managed within a component. Props are read-only, whereas state can be modified using setState or hooks."
  },
  {
    id: 6,
    question: "What are React hooks?",
    answer: "Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, and useContext."
  },
  {
    id: 7,
    question: "What is the virtual DOM?",
    answer: "The virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to improve performance by calculating the minimal changes needed and updating only those parts."
  },
  {
    id: 8,
    question: "What is a component in React?",
    answer: "A component is a reusable piece of the UI that can manage its own state and props. Components can be either functional or class-based and help build complex UIs from smaller pieces."
  },
  {
    id: 9,
    question: "What is lifting state up?",
    answer: "Lifting state up means moving state from a child component to its parent component. This allows multiple child components to share and sync the same state value."
  },
  {
    id: 10,
    question: "What is an accordion component?",
    answer: "An accordion component is a UI element that displays a list of collapsible sections. Only one section typically remains expanded at a time, allowing users to reveal hidden content by clicking on headers."
  }
];

export default faqDatas;

// export { faqDatas };
