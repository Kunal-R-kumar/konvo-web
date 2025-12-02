// TODO Under Development

// import React, { useEffect, useRef, useState } from "react";
// import "./ChatWindow.css";

// const ScrollControls = ({ scrollContainerRef }) => {
//   const [showScrollBottom, setShowScrollBottom] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const hideTimeout = useRef(null);

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const onScroll = () => {
//       const isAtBottom =
//         container.scrollHeight - container.scrollTop <=
//         container.clientHeight + 10;
//       const isAtTop = container.scrollTop === 0;

//       setShowScrollBottom(!isAtBottom);
//       setShowScrollTop(!isAtTop);

//       setVisible(true);
//       clearTimeout(hideTimeout.current);

//       hideTimeout.current = setTimeout(() => {
//         setVisible(false);
//       }, 3000);
//     };

//     container.addEventListener("scroll", onScroll);
//     return () => container.removeEventListener("scroll", onScroll);
//   }, [scrollContainerRef]);

//   const scrollToBottom = () => {
//     scrollContainerRef.current.scrollTo({
//       top: scrollContainerRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   };

//   const scrollToTop = () => {
//     scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       {showScrollTop && (
//         <button
//           className={`scroll-btn top ${visible ? "visible" : ""}`}
//           onClick={scrollToTop}
//         >
//           ⬆︎
//         </button>
//       )}

//       {showScrollBottom && (
//         <button
//           className={`scroll-btn bottom ${visible ? "visible" : ""}`}
//           onClick={scrollToBottom}
//         >
//           ⬇︎
//         </button>
//       )}
//     </>
//   );
// };

// export default ScrollControls;
