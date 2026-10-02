import React from "react";
import "./IdeaCTA.css";

/* =========================================================
   NETWORK DATA
========================================================= */

const networkGroups = [
  {
    id: "left-top",
    lines: [
      "M 20 55 L 95 82 L 150 54 L 228 78",
      "M 95 82 L 61 145 L 112 190",
      "M 150 54 L 190 115 L 258 88",
      "M 20 55 L 61 145",
    ],
    dots: [
      [20, 55],
      [95, 82],
      [150, 54],
      [228, 78],
      [61, 145],
      [112, 190],
      [190, 115],
      [258, 88],
    ],
  },

  {
    id: "top-center",
    lines: [
      "M 845 10 L 900 74 L 848 130 L 935 104",
      "M 900 74 L 968 62 L 1035 112",
      "M 848 130 L 910 170",
    ],
    dots: [
      [845, 10],
      [900, 74],
      [848, 130],
      [935, 104],
      [968, 62],
      [1035, 112],
      [910, 170],
    ],
  },

  {
    id: "right-top",
    lines: [
      "M 1330 48 L 1380 15 L 1432 74",
      "M 1330 48 L 1280 125 L 1378 118",
      "M 1280 125 L 1230 164",
    ],
    dots: [
      [1330, 48],
      [1380, 15],
      [1432, 74],
      [1280, 125],
      [1378, 118],
      [1230, 164],
    ],
  },

  {
    id: "right-bottom",
    lines: [
      "M 1120 445 L 1180 412 L 1250 478 L 1300 430",
      "M 1180 412 L 1240 520 L 1300 430",
      "M 1250 478 L 1350 458",
    ],
    dots: [
      [1120, 445],
      [1180, 412],
      [1250, 478],
      [1300, 430],
      [1240, 520],
      [1350, 458],
    ],
  },

  {
    id: "bottom-left",
    lines: [
      "M 92 460 L 138 416 L 210 466 L 245 525",
      "M 138 416 L 188 380 L 230 442",
      "M 210 466 L 270 430",
    ],
    dots: [
      [92, 460],
      [138, 416],
      [210, 466],
      [245, 525],
      [188, 380],
      [230, 442],
      [270, 430],
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const IdeaCTA = () => {
  return (
    <section className="ideaCTA">

      {/* =================================================
          NETWORK BACKGROUND
      ================================================= */}

      <div
        className="ideaCTA__network"
        aria-hidden="true"
      >
        <svg
          className="ideaCTA__network-svg"
          viewBox="0 0 1536 627"
          preserveAspectRatio="none"
        >
          {networkGroups.map((group, groupIndex) => (
            <g
              key={group.id}
              className="ideaCTA__network-group"
            >
              {/* =========================================
                  NETWORK LINES
              ========================================= */}

              {group.lines.map((line, lineIndex) => (
                <path
                  key={`${group.id}-line-${lineIndex}`}
                  d={line}
                  pathLength="1"
                  className="ideaCTA__network-line"
                  style={{
                    "--line-delay": `${
                      groupIndex * 1.6 +
                      lineIndex * 0.6
                    }s`,
                  }}
                />
              ))}

              {/* =========================================
                  NETWORK NODES
              ========================================= */}

              {group.dots.map(
                ([cx, cy], dotIndex) => (
                  <circle
                    key={`${group.id}-dot-${dotIndex}`}
                    cx={cx}
                    cy={cy}
                    r="1.8"
                    className="ideaCTA__network-dot"
                    style={{
                      "--dot-delay": `${
                        groupIndex * 1.6 +
                        dotIndex * 0.42
                      }s`,
                    }}
                  />
                )
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="ideaCTA__container">

        <div className="ideaCTA__content">

          {/* ===============================================
              HEADING
          =============================================== */}

          <h2 className="ideaCTA__heading">

            <span className="ideaCTA__heading-white">
              Have an Idea?
            </span>

            <span className="ideaCTA__heading-gradient">
              Let's Figure Out
            </span>

            <span className="ideaCTA__heading-gradient">
              What Comes Next.
            </span>

          </h2>

          {/* ===============================================
              DESCRIPTION
          =============================================== */}

          <p className="ideaCTA__description">
            You don't need to have everything figured out. Start
            with your idea, problem or concept and let's explore
            the right next step.
          </p>

          {/* ===============================================
              BUTTONS
          =============================================== */}

          <div className="ideaCTA__actions">

            <a
              href="/contact"
              className="
                ideaCTA__button
                ideaCTA__button--primary
              "
            >
              <span>
                Discuss Your Idea
              </span>

              <span
                className="ideaCTA__button-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>

            <a
              href="/contact"
              className="
                ideaCTA__button
                ideaCTA__button--secondary
              "
            >
              Contact ProJenius
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};

export default IdeaCTA;