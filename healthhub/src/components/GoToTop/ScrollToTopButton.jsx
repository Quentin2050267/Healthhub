import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";

/**
 * GoToTop component
 * This component renders a button that appears when the user scrolls down a certain distance.
 * When clicked, it smoothly scrolls the page back to the top.
 */
const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /**
     * handleScroll
     * Handles the scroll event and sets the visibility of the button based on the scroll position.
     */
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > 200); // Change 200 to your desired scroll distance
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * goToTop
   * Scrolls the window to the top smoothly when the button is clicked.
   */
  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <Wrapper onClick={goToTop}>
          <FaArrowUp className="top-btn--icon" />
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 95px;
  right: 20px;
  color: white;
  background-color: rgb(22 0 74);
  width: 55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    background-color: #22FFFD;
  }
`;

export default GoToTop;