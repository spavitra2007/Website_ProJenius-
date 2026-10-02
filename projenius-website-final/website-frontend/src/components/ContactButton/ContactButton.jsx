import React from "react";
import "./ContactButton.css";

/* variant: "primary" | "secondary" | "link"
   size: "md" | "lg"
   tone: "light" (default) | "dark"  -> use "dark" on the dark hero background
   loading: shows a spinner and disables the button */
export default function ContactButton({
  variant = "primary",
  size = "md",
  tone = "light",
  loading = false,
  fluidMobile = false,
  href,
  type = "button",
  disabled,
  children,
  ...rest
}) {
  const classes = [
    "pjct-btn",
    `pjct-btn--${variant}`,
    `pjct-btn--${size}`,
    tone === "dark" ? "pjct-btn--on-dark" : "",
    fluidMobile ? "pjct-btn--fluid" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && <span className="pjct-btn__spinner" aria-hidden="true" />}
      <span className="pjct-btn__label">{children}</span>
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} type={type} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
