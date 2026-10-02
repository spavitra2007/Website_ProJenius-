import React, { useEffect, useRef } from "react";
import ContactIcon from "../ContactIcon/ContactIcon";
import { CONTACT_CONFIG } from "../ContactConfig/ContactConfig";
import "./ContactDirect.css";

/* =========================================================
   SCROLL REVEAL
========================================================= */

function useReveal(className) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    if (
      typeof IntersectionObserver === "undefined"
    ) {
      element.classList.add(className);
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.classList.add(className);
            observer.disconnect();
          }
        },
        {
          threshold: 0.12,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [className]);

  return ref;
}

/* =========================================================
   HELPERS
========================================================= */

const cleanPhone = (value) =>
  String(value || "").replace(
    /[^\d+]/g,
    ""
  );

const cleanWhatsApp = (value) =>
  String(value || "").replace(
    /\D/g,
    ""
  );

/* =========================================================
   COMPONENT
========================================================= */

export default function ContactDirect() {
  const contact =
    CONTACT_CONFIG.contact;

  const sectionRef = useReveal(
    "pjct-direct--visible"
  );

  /* =======================================================
     CONTACT CARDS
  ======================================================= */

  const cards = [
    {
      key: "phone",
      icon: "phone",
      // eyebrow: "CALL US",
      title: "Phone",
      description:
        "Official ProJenius business phone",
      value:
        contact.phone ||
        "+91 89254 50473",
      href: contact.phone
        ? `tel:${cleanPhone(contact.phone)}`
        : "tel:+918925450473",
    },

    {
      key: "email",
      icon: "mail",
      // eyebrow: "EMAIL US",
      title: "Email",
      description:
        "Official ProJenius email",
      value:
        contact.email ||
        "teamprojenius@gmail.com",
      href: contact.email
        ? `mailto:${contact.email}`
        : "mailto:teamprojenius@gmail.com",
    },

    {
      key: "whatsapp",
      icon: "whatsapp",
      // eyebrow: "WHATSAPP",
      title: "WhatsApp",
      description:
        "Chat with the ProJenius team",
      value:
        "+91 89254 50473",
      href: cleanWhatsApp(
        contact.whatsapp
      )
        ? `https://wa.me/${cleanWhatsApp(
            contact.whatsapp
          )}`
        : "https://wa.me/918925450473",
      external: true,
    },

    {
      key: "office",
      icon: "pin",
      // eyebrow: "OUR LOCATION",
      title: "Office",
      description:
        "ProJenius office location",
      value:
        contact.address ||
        "Madurai, Tamil Nadu",
      href:
        contact.mapUrl ||
        "https://maps.app.goo.gl/HvpbcZaJhUyh6Bhm9",
      external: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pjct-direct"
      className="pjct-direct"
      aria-labelledby="pjct-direct-title"
    >
      <div className="pjct-direct__inner">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="pjct-direct__head">
          <h2
            id="pjct-direct-title"
            className="pjct-direct__title"
          >
            Prefer to Reach Us Directly?
          </h2>

          <p className="pjct-direct__support">
            Use the official ProJenius channels below.
          </p>
        </header>

        {/* =================================================
            CONTACT CARDS
        ================================================= */}

        <div className="pjct-direct__grid">
          {cards.map((card, index) => {
            const content = (
              <>
                {/* Icon */}
                <span className="pjct-direct__icon">
                  <ContactIcon
                    name={card.icon}
                    size="1.4em"
                  />
                </span>

                {/* Eyebrow */}
                <span className="pjct-direct__eyebrow">
                  {card.eyebrow}
                </span>

                {/* Title */}
                <h3 className="pjct-direct__card-title">
                  {card.title}
                </h3>

                {/* Description */}
                <span className="pjct-direct__sub">
                  {card.description}
                </span>

                {/* Actual contact value */}
                <span className="pjct-direct__value">
                  {card.value}
                </span>
              </>
            );

            const className = [
              "pjct-direct__card",
              `pjct-direct__card--${index + 1}`,
            ].join(" ");

            if (card.href) {
              return (
                <a
                  key={card.key}
                  className={className}
                  href={card.href}
                  {...(
                    card.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {}
                  )}
                  aria-label={`${card.title}: ${card.value}`}
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={card.key}
                className={className}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}