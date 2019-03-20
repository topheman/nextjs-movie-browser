/**
 * Inspired by https://codepen.io/naturalclar/pen/zEwvbg?editors=0110
 */

import React from "react";

import { filterHtmlProps } from "../utils/helpers";

interface Props {
  color: any;
  colorOpen: any;
  open: boolean;
  style?: React.CSSProperties | undefined;
}

const HamburgerButton: React.FunctionComponent<
  React.HTMLAttributes<HTMLElement> & Props
> = ({ style, color, colorOpen, open, ...remainingProps }) => {
  const styles = {
    container: {
      height: "32px",
      width: "32px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      padding: "4px"
    },
    line: {
      height: "2px",
      width: "20px",
      background: color,
      transition: "all 0.2s ease"
    },
    lineTop: {
      background: open ? colorOpen : color,
      transform: open ? "rotate(45deg)" : "none",
      transformOrigin: "top left",
      marginBottom: "5px"
    },
    lineMiddle: {
      opacity: open ? 0 : 1,
      transform: open ? "translateX(-16px)" : "none"
    },
    lineBottom: {
      background: open ? colorOpen : color,
      transform: open ? "translateX(-1px) rotate(-45deg)" : "none",
      transformOrigin: "top left",
      marginTop: "5px"
    }
  };
  return (
    <div
      style={{ ...style, ...styles.container } as React.CSSProperties}
      {...filterHtmlProps(remainingProps)}
    >
      <div style={{ ...styles.line, ...styles.lineTop }} />
      <div style={{ ...styles.line, ...styles.lineMiddle }} />
      <div style={{ ...styles.line, ...styles.lineBottom }} />
    </div>
  );
};

export default HamburgerButton;
