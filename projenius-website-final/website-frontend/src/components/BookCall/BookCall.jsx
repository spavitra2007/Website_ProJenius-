import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  CheckCircle2,
  CalendarDays,
  Clock,
  Clock3,
  ArrowRight,
  ArrowLeft,
  Check,
  CreditCard,
  QrCode,
  Smartphone,
  ShieldCheck,
  Lock,
  Copy,
  ExternalLink,
  Calendar,
  Sparkles,
  Building2,
  Mail,
  Phone,
  User,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import "./BookCall.css";

/* =========================================================
   FIXED 4 TIME SLOTS
========================================================= */

const TIME_SLOTS = [
  {
    label: "10:00 AM",
    hour: 10,
    minute: 0,
  },
  {
    label: "2:30 PM",
    hour: 14,
    minute: 30,
  },
  {
    label: "4:00 PM",
    hour: 16,
    minute: 0,
  },
  {
    label: "6:00 PM",
    hour: 18,
    minute: 0,
  },
];

const AM_HOURS = [9, 10, 11];
const PM_HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ALL_MINUTES = [0, 15, 30, 45];

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const TARGET_ROLES = [
  "Full Stack Development",
  "Frontend / React Developer",
  "Backend & APIs (Node/Java/Python)",
  "AI & Data Science",
  "Cloud & DevOps Engineering",
  "College Student / Placement Prep",
  "Career Transition / Other",
];

/* =========================================================
   DATE HELPERS
========================================================= */

const startOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isSameDay = (date1, date2) => {
  return formatDateKey(date1) === formatDateKey(date2);
};

const createFiveDates = () => {
  const today = startOfDay(new Date());

  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
};

/* =========================================================
   TIME CONVERSION & EXPIRED CHECK
========================================================= */

const getCustom24Hour = (hour12, ampm) => {
  if (ampm === "AM") {
    return hour12 === 12 ? 0 : hour12;
  }
  return hour12 === 12 ? 12 : hour12 + 12;
};

const isSlotExpired = (date, hour, minute) => {
  const now = new Date();

  // If date is before today
  if (date < startOfDay(now)) {
    return true;
  }

  // Future dates are always available
  if (!isSameDay(date, now)) {
    return false;
  }

  // Same day: compare with current time
  const slotTime = new Date(date);
  slotTime.setHours(hour, minute, 0, 0);

  return slotTime <= now;
};

const getFirstAvailableSlot = (date) => {
  return (
    TIME_SLOTS.find(
      (slot) => !isSlotExpired(date, slot.hour, slot.minute)
    ) || null
  );
};

/* =========================================================
   COMPONENT
========================================================= */

const BookCall = () => {
  const availableDates = useMemo(() => createFiveDates(), []);

  // Compute initial date and slot: If today's slots all expired, pick tomorrow
  const initialSelection = useMemo(() => {
    for (const d of availableDates) {
      const slot = getFirstAvailableSlot(d);
      if (slot) {
        return {
          date: d,
          slot: slot.label,
          hour: slot.hour,
          minute: slot.minute,
        };
      }
    }
    return {
      date: availableDates[0],
      slot: TIME_SLOTS[0].label,
      hour: TIME_SLOTS[0].hour,
      minute: TIME_SLOTS[0].minute,
    };
  }, [availableDates]);

  /* =======================================================
     STATES
  ======================================================= */

  // Workflow steps: 1 = Slot Select, 2 = Attendee Info, 3 = Payment, 4 = Confirmed
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedDate, setSelectedDate] = useState(initialSelection.date);
  const [selectedTime, setSelectedTime] = useState(initialSelection.slot);
  const [selectedSlotDetails, setSelectedSlotDetails] = useState({
    hour: initialSelection.hour,
    minute: initialSelection.minute,
    isCustom: false,
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [autoMoveMessage, setAutoMoveMessage] = useState("");

  // Mode: "fixed" or "custom" (convenient slot)
  const [slotMode, setSlotMode] = useState("fixed");

  // Clock picker state for convenient slot
  const [customHour, setCustomHour] = useState(5);
  const [customMinute, setCustomMinute] = useState(30);
  const [customAmPm, setCustomAmPm] = useState("PM");
  const [customTimeNotice, setCustomTimeNotice] = useState("");

  // Step 2 Form Details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    targetRole: TARGET_ROLES[0],
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Submission & Confirmation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  /* =======================================================
     DYNAMIC TIME FILTERING (ONLY REQUIRED / UNEXPIRED TIMES)
  ======================================================= */

  // Check if AM is still available for selected date
  const isAmAvailable = useMemo(() => {
    const now = currentTime;
    if (!isSameDay(selectedDate, now)) return true;
    return AM_HOURS.some((h) =>
      ALL_MINUTES.some(
        (m) => !isSlotExpired(selectedDate, getCustom24Hour(h, "AM"), m)
      )
    );
  }, [selectedDate, currentTime]);

  // Check if PM is still available for selected date
  const isPmAvailable = useMemo(() => {
    const now = currentTime;
    if (!isSameDay(selectedDate, now)) return true;
    return PM_HOURS.some((h) =>
      ALL_MINUTES.some(
        (m) => !isSlotExpired(selectedDate, getCustom24Hour(h, "PM"), m)
      )
    );
  }, [selectedDate, currentTime]);

  // Automatically switch AM to PM if AM has passed today
  useEffect(() => {
    if (!isAmAvailable && customAmPm === "AM") {
      setCustomAmPm("PM");
    }
  }, [isAmAvailable, customAmPm]);

  // Filter available hours: ONLY hours that have at least one unexpired minute
  const availableHours = useMemo(() => {
    const candidateHours = customAmPm === "AM" ? AM_HOURS : PM_HOURS;
    const now = currentTime;

    if (!isSameDay(selectedDate, now)) {
      return candidateHours;
    }

    return candidateHours.filter((h) => {
      const h24 = getCustom24Hour(h, customAmPm);
      return ALL_MINUTES.some((m) => !isSlotExpired(selectedDate, h24, m));
    });
  }, [selectedDate, customAmPm, currentTime]);

  // Auto-correct customHour if current hour is not in availableHours
  useEffect(() => {
    if (availableHours.length > 0 && !availableHours.includes(customHour)) {
      setCustomHour(availableHours[0]);
    }
  }, [availableHours, customHour]);

  // Filter available minutes: ONLY minutes that are in the future for customHour
  const availableMinutes = useMemo(() => {
    const now = currentTime;
    if (!isSameDay(selectedDate, now)) {
      return ALL_MINUTES;
    }

    const h24 = getCustom24Hour(customHour, customAmPm);
    const filtered = ALL_MINUTES.filter(
      (m) => !isSlotExpired(selectedDate, h24, m)
    );
    return filtered.length > 0 ? filtered : [0];
  }, [selectedDate, customHour, customAmPm, currentTime]);

  // Auto-correct customMinute if current minute is not in availableMinutes
  useEffect(() => {
    if (availableMinutes.length > 0 && !availableMinutes.includes(customMinute)) {
      setCustomMinute(availableMinutes[0]);
    }
  }, [availableMinutes, customMinute]);

  // List of all upcoming convenient slots for dropdown selection
  const allUpcomingConvenientSlots = useMemo(() => {
    const slots = [];
    const periods = [];
    if (isAmAvailable) periods.push("AM");
    if (isPmAvailable) periods.push("PM");

    for (const ap of periods) {
      const hours = ap === "AM" ? AM_HOURS : PM_HOURS;
      for (const h of hours) {
        const h24 = getCustom24Hour(h, ap);
        for (const m of ALL_MINUTES) {
          if (!isSlotExpired(selectedDate, h24, m)) {
            const hStr = h < 10 ? `0${h}` : `${h}`;
            const mStr = m < 10 ? `0${m}` : `${m}`;
            slots.push({
              h,
              m,
              ap,
              h24,
              label: `${hStr}:${mStr} ${ap}`,
            });
          }
        }
      }
    }
    return slots;
  }, [selectedDate, isAmAvailable, isPmAvailable]);

  // Upcoming quick chips (only unexpired, popular time presets)
  const upcomingQuickChips = useMemo(() => {
    const onHalfHours = allUpcomingConvenientSlots.filter(
      (s) => s.m === 0 || s.m === 30
    );
    return onHalfHours.length > 0
      ? onHalfHours.slice(0, 6)
      : allUpcomingConvenientSlots.slice(0, 6);
  }, [allUpcomingConvenientSlots]);

  /* =======================================================
     REAL-TIME TICK: CHECK TIME & MOVE TO NEXT SLOT
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // When selecting slots, if the current slot finished, move to next!
      if (currentStep === 1 && slotMode === "fixed" && selectedSlotDetails) {
        if (
          isSlotExpired(
            selectedDate,
            selectedSlotDetails.hour,
            selectedSlotDetails.minute
          )
        ) {
          const nextSlot = getFirstAvailableSlot(selectedDate);
          if (nextSlot) {
            setSelectedTime(nextSlot.label);
            setSelectedSlotDetails({
              hour: nextSlot.hour,
              minute: nextSlot.minute,
              isCustom: false,
            });
            setAutoMoveMessage(
              `Time ${selectedSlotDetails.hour > 12 ? selectedSlotDetails.hour - 12 : selectedSlotDetails.hour}:${String(selectedSlotDetails.minute).padStart(2, "0")} has passed. Moved to next available slot: ${nextSlot.label}.`
            );
            setTimeout(() => setAutoMoveMessage(""), 6000);
          } else {
            // All slots today finished: advance date to tomorrow
            const tomorrow = availableDates[1];
            if (tomorrow) {
              setSelectedDate(tomorrow);
              const firstSlotTomorrow = TIME_SLOTS[0];
              setSelectedTime(firstSlotTomorrow.label);
              setSelectedSlotDetails({
                hour: firstSlotTomorrow.hour,
                minute: firstSlotTomorrow.minute,
                isCustom: false,
              });
              setAutoMoveMessage(
                "All slots for today have ended. Moved to tomorrow at 10:00 AM."
              );
              setTimeout(() => setAutoMoveMessage(""), 7000);
            }
          }
        }
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [selectedDate, selectedSlotDetails, slotMode, availableDates, currentStep]);

  /* =======================================================
     DATE CHANGE HANDLER
  ======================================================= */

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAutoMoveMessage("");

    if (slotMode === "fixed") {
      const currentSlotDef = TIME_SLOTS.find(
        (s) => s.label === selectedTime
      );

      // If current selected slot is available on the new date, keep it
      if (
        currentSlotDef &&
        !isSlotExpired(date, currentSlotDef.hour, currentSlotDef.minute)
      ) {
        setSelectedSlotDetails({
          hour: currentSlotDef.hour,
          minute: currentSlotDef.minute,
          isCustom: false,
        });
      } else {
        // Otherwise, move to the next available slot
        const nextSlot = getFirstAvailableSlot(date);
        if (nextSlot) {
          setSelectedTime(nextSlot.label);
          setSelectedSlotDetails({
            hour: nextSlot.hour,
            minute: nextSlot.minute,
            isCustom: false,
          });
        } else {
          setSelectedTime(null);
        }
      }
    } else {
      // Custom / convenient slot mode: revalidate
      const h24 = getCustom24Hour(customHour, customAmPm);
      if (isSlotExpired(date, h24, customMinute)) {
        setCustomTimeNotice(
          "Selected time has passed for this date. Please pick an upcoming time."
        );
      } else {
        setCustomTimeNotice("");
      }
    }
  };

  /* =======================================================
     TIME CHANGE HANDLER (FIXED)
  ======================================================= */

  const handleTimeChange = (slot) => {
    const expired = isSlotExpired(
      selectedDate,
      slot.hour,
      slot.minute
    );

    if (expired) {
      return;
    }

    setSelectedTime(slot.label);
    setSelectedSlotDetails({
      hour: slot.hour,
      minute: slot.minute,
      isCustom: false,
    });
    setAutoMoveMessage("");
  };

  /* =======================================================
     CONVENIENT SLOT / CLOCK HANDLERS
  ======================================================= */

  const formattedCustomTime = useMemo(() => {
    const hStr = customHour < 10 ? `0${customHour}` : `${customHour}`;
    const mStr = customMinute < 10 ? `0${customMinute}` : `${customMinute}`;
    return `${hStr}:${mStr} ${customAmPm}`;
  }, [customHour, customMinute, customAmPm]);

  const hour24 = getCustom24Hour(customHour, customAmPm);
  const hour12 = customHour % 12;
  const hourAngle = (hour12 + customMinute / 60) * 30;
  const minuteAngle = customMinute * 6;

  const validateCustom = (h, m, ap) => {
    const h24Val = getCustom24Hour(h, ap);
    if (isSlotExpired(selectedDate, h24Val, m)) {
      setCustomTimeNotice(
        "This time has already passed for today. Please pick an upcoming time."
      );
      return false;
    }
    setCustomTimeNotice("");
    return true;
  };

  const handleCustomHourChange = (newH) => {
    setCustomHour(newH);
    validateCustom(newH, customMinute, customAmPm);
  };

  const handleCustomMinuteChange = (newM) => {
    setCustomMinute(newM);
    validateCustom(customHour, newM, customAmPm);
  };

  const handleCustomAmPmChange = (newAp) => {
    if (newAp === "AM" && !isAmAvailable) {
      return; // Cannot switch to AM if AM has passed today
    }
    setCustomAmPm(newAp);
    validateCustom(customHour, customMinute, newAp);
  };

  const selectQuickConvenientSlot = (quick) => {
    setCustomHour(quick.h);
    setCustomMinute(quick.m);
    setCustomAmPm(quick.ap);
    const valid = validateCustom(quick.h, quick.m, quick.ap);
    if (valid) {
      setSelectedTime(quick.label);
      setSelectedSlotDetails({
        hour: getCustom24Hour(quick.h, quick.ap),
        minute: quick.m,
        isCustom: true,
      });
    }
  };

  const applyCustomConvenientTime = () => {
    const valid = validateCustom(customHour, customMinute, customAmPm);
    if (!valid) return;

    setSelectedTime(formattedCustomTime);
    setSelectedSlotDetails({
      hour: hour24,
      minute: customMinute,
      isCustom: true,
    });
  };

  /* =======================================================
     STEP NAVIGATION & FORM VALIDATION
  ======================================================= */

  const handleProceedToDetails = () => {
    if (!selectedTime || !termsAccepted) {
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone/WhatsApp number is required";
    } else if (!/^\+?[0-9]{10,13}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      errors.phone = "Please enter a valid 10-digit number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* =======================================================
     SUBMIT BOOKING (DIRECT CONFIRMATION)
  ======================================================= */

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `PJ-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingId(generatedId);
      setIsSubmitting(false);
      setCurrentStep(3);
      window.scrollTo({ top: 350, behavior: "smooth" });
    }, 700);
  };

  const handleCopyMeetLink = () => {
    navigator.clipboard.writeText("https://meet.google.com/prj-career-call");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleResetBooking = () => {
    setCurrentStep(1);
    setSlotMode("fixed");
    setTermsAccepted(false);
    const initialSlot = getFirstAvailableSlot(availableDates[0]) || TIME_SLOTS[0];
    setSelectedDate(availableDates[0]);
    setSelectedTime(initialSlot.label);
    setSelectedSlotDetails({
      hour: initialSlot.hour,
      minute: initialSlot.minute,
      isCustom: false,
    });
  };

  const handleTermsClick = () => {
    window.open(
      "/terms-and-conditions",
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     CALENDAR LINK GENERATOR
  ======================================================= */

  const googleCalendarUrl = useMemo(() => {
    if (!selectedSlotDetails || !selectedDate) return "#";
    const startTime = new Date(selectedDate);
    startTime.setHours(selectedSlotDetails.hour, selectedSlotDetails.minute, 0, 0);
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

    const toUtc = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const dates = `${toUtc(startTime)}/${toUtc(endTime)}`;

    const title = encodeURIComponent("1:1 Career Guidance Call with ProJenius Mentor");
    const details = encodeURIComponent(
      `ProJenius 1:1 Career Guidance Mentoring Session.\nCandidate: ${formData.name || "Student"}\nRole Interest: ${formData.targetRole}\nMeeting Link: https://meet.google.com/prj-career-call\nSupport: contact@projenius.com`
    );
    const location = encodeURIComponent("https://meet.google.com/prj-career-call");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }, [selectedDate, selectedSlotDetails, formData]);

  const formattedSelectedDate = useMemo(() => {
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="book-call-section">
      <div className="book-call-container">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}
        <div className="book-call-content">
          <h1>
            A Small Fee. A Serious
            <br />
            Conversation.
          </h1>

          {/* TRUST */}
          <div className="book-call-trust">
            <Users size={17} strokeWidth={2.5} />
            <span>Trusted by 500+ students so far</span>
          </div>

          {/* DESCRIPTION */}
          <p className="book-call-description">
            Why ₹99, not free? A nominal fee filters for students who are
            genuinely serious, allowing our mentors to give their full,
            undistracted attention rather than rushing through high-volume,
            low-commitment calls.
          </p>

          {/* INCLUDED */}
          <h3>What's included in your session:</h3>

          <div className="book-call-features">
            <div className="book-call-feature">
              <CheckCircle2 />
              <span>
                A real assessment of your current resume/profile against your
                target role
              </span>
            </div>

            <div className="book-call-feature">
              <CheckCircle2 />
              <span>
                A personalized first-draft roadmap you keep regardless of
                whether you continue with ProJenius
              </span>
            </div>

            <div className="book-call-feature">
              <CheckCircle2 />
              <span>Direct, honest feedback on your biggest current gap</span>
            </div>

            <div className="book-call-feature">
              <CheckCircle2 />
              <span>
                A clear recommendation on next steps — including telling you
                honestly if ProJenius isn't the right fit for you
              </span>
            </div>
          </div>

          {/* INFO PILLS */}
          <div className="book-call-pills">
            <div className="book-call-pill book-call-pill-wide">
              <ArrowRight />
              <strong>
                ₹99 (fully refundable if you're not satisfied)
              </strong>
            </div>

            <div className="book-call-pill">
              <Clock3 />
              <strong>30 Minutes</strong>
            </div>

            <div className="book-call-pill book-call-pill-wide">
              <Users />
              <strong>1:1 With a Real Mentor, Not a Sales Rep</strong>
            </div>

            <div className="book-call-pill">
              <CalendarDays />
              <strong>Credited toward program fee if enrolled</strong>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT BOOKING CARD
        ================================================= */}
        <div className="book-call-card">
          {/* HEADER */}
          <div className="book-call-card-header">
            <h2>
              {currentStep === 1 && "Book a Call"}
              {currentStep === 2 && "Attendee Details"}
              {currentStep === 3 && "Booking Confirmed! 🎉"}
            </h2>
          </div>

          {/* STEP PROGRESS INDICATOR */}
          <div className="book-call-steps-bar">
            <div
              className={`book-call-step-item ${
                currentStep === 1
                  ? "step-active"
                  : currentStep > 1
                  ? "step-completed"
                  : ""
              }`}
              onClick={() => currentStep > 1 && currentStep < 3 && setCurrentStep(1)}
            >
              <div className="step-circle">
                {currentStep > 1 ? <Check size={13} strokeWidth={3} /> : "1"}
              </div>
              <span className="step-label">Date & Time</span>
            </div>

            <div className={`step-line ${currentStep >= 2 ? "active" : ""}`} />

            <div
              className={`book-call-step-item ${
                currentStep === 2
                  ? "step-active"
                  : currentStep > 2
                  ? "step-completed"
                  : ""
              }`}
            >
              <div className="step-circle">
                {currentStep > 2 ? <Check size={13} strokeWidth={3} /> : "2"}
              </div>
              <span className="step-label">Your Info</span>
            </div>
          </div>

          {/* BODY */}
          <div className="book-call-card-body">
            {/* =========================================================
                STEP 1: SELECT DATE & TIME
            ========================================================= */}
            {currentStep === 1 && (
              <>
                {/* CALENDAR ICON */}
                <div className="book-call-calendar-icon">
                  <CalendarDays size={40} strokeWidth={1.7} />
                </div>

                <h3>Select a Date & Time</h3>
                <p className="book-call-subtitle">
                  Choose a convenient slot for your mentoring session.
                </p>

                {/* AUTO-ADVANCED TIME NOTIFICATION */}
                {autoMoveMessage && (
                  <div className="book-call-auto-banner">
                    <Clock size={16} />
                    <span>{autoMoveMessage}</span>
                  </div>
                )}

                {/* =================================================
                    DATE SELECTOR
                ================================================= */}
                <div className="book-call-dates">
                  {availableDates.map((date) => {
                    const active = isSameDay(date, selectedDate);
                    const today = isSameDay(date, new Date());
                    const allTodayExpired =
                      today && !getFirstAvailableSlot(date);

                    return (
                      <button
                        type="button"
                        key={formatDateKey(date)}
                        className={`book-call-date ${
                          active ? "book-call-date-active" : ""
                        } ${allTodayExpired ? "book-call-date-ended" : ""}`}
                        onClick={() => handleDateChange(date)}
                      >
                        <span>
                          {today
                            ? allTodayExpired
                              ? "Today (Ended)"
                              : "Today"
                            : WEEK_DAYS[date.getDay()]}
                        </span>
                        <strong>{date.getDate()}</strong>
                      </button>
                    );
                  })}
                </div>

                {/* =================================================
                    SLOT MODE TABS (4 FIXED SLOTS vs CONVENIENT SLOT)
                ================================================= */}
                <div className="book-call-slot-tabs">
                  <button
                    type="button"
                    className={`slot-tab-btn ${
                      slotMode === "fixed" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSlotMode("fixed");
                      const nextSlot =
                        getFirstAvailableSlot(selectedDate) || TIME_SLOTS[0];
                      setSelectedTime(nextSlot.label);
                      setSelectedSlotDetails({
                        hour: nextSlot.hour,
                        minute: nextSlot.minute,
                        isCustom: false,
                      });
                    }}
                  >
                    <Clock3 size={15} />
                    <span>4 Fixed Slots</span>
                  </button>

                  <button
                    type="button"
                    className={`slot-tab-btn ${
                      slotMode === "custom" ? "active" : ""
                    }`}
                    onClick={() => setSlotMode("custom")}
                  >
                    <Clock size={15} />
                    <span>Book Convenient Slot 🕒</span>
                  </button>
                </div>

                {/* =================================================
                    MODE A: 4 FIXED TIME SLOTS
                ================================================= */}
                {slotMode === "fixed" && (
                  <div className="book-call-fixed-wrapper">
                    <div className="book-call-times">
                      {TIME_SLOTS.map((slot) => {
                        const expired = isSlotExpired(
                          selectedDate,
                          slot.hour,
                          slot.minute
                        );
                        const active = selectedTime === slot.label;
                        const isNextAvailable =
                          !expired &&
                          getFirstAvailableSlot(selectedDate)?.label ===
                            slot.label;

                        return (
                          <button
                            type="button"
                            key={slot.label}
                            disabled={expired}
                            className={`
                              book-call-time
                              ${active ? "book-call-time-active" : ""}
                              ${expired ? "book-call-time-disabled" : ""}
                            `}
                            onClick={() => handleTimeChange(slot)}
                          >
                            <span className="slot-btn-inner">
                              <Clock3 size={14} className="slot-clock-icon" />
                              <span className="slot-label">{slot.label}</span>
                            </span>
                            {expired && (
                              <span className="slot-expired-badge">Passed</span>
                            )}
                            {isNextAvailable && !expired && !active && (
                              <span className="slot-next-badge">Next Slot</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* CONVENIENT TIMESLOT CALLOUT */}
                    <button
                      type="button"
                      className="book-call-switch-clock-link"
                      onClick={() => setSlotMode("custom")}
                    >
                      <Clock size={16} />
                      <span>
                        Need another time? Click to{" "}
                        <strong>Book Convenient Slot (Clock Picker)</strong>
                      </span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {/* =================================================
                    MODE B: CONVENIENT TIMESLOT WITH INTERACTIVE CLOCK
                ================================================= */}
                {slotMode === "custom" && (
                  <div className="book-call-clock-container">
                    <div className="clock-header-row">
                      <div className="clock-title">
                        <Clock size={17} />
                        <strong>Interactive Clock Picker</strong>
                      </div>
                      <span className="clock-hint">
                        Only available upcoming times are listed
                      </span>
                    </div>

                    {/* ALL CONVENIENT SLOTS DIRECT DROPDOWN */}
                    {allUpcomingConvenientSlots.length > 0 && (
                      <div className="convenient-dropdown-box">
                        <label>
                          <Clock size={13} /> Select Available Convenient Slot:
                        </label>
                        <select
                          className="convenient-full-select"
                          value={
                            allUpcomingConvenientSlots.some(
                              (s) => s.label === selectedTime
                            )
                              ? selectedTime
                              : formattedCustomTime
                          }
                          onChange={(e) => {
                            const found = allUpcomingConvenientSlots.find(
                              (s) => s.label === e.target.value
                            );
                            if (found) {
                              setCustomHour(found.h);
                              setCustomMinute(found.m);
                              setCustomAmPm(found.ap);
                              setSelectedTime(found.label);
                              setSelectedSlotDetails({
                                hour: found.h24,
                                minute: found.m,
                                isCustom: true,
                              });
                              setCustomTimeNotice("");
                            }
                          }}
                        >
                          {allUpcomingConvenientSlots.map((s) => (
                            <option key={s.label} value={s.label}>
                              {s.label} (Available Slot)
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="clock-interactive-box">
                      {/* SVG ANALOG CLOCK */}
                      <div className="analog-clock-wrap">
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                          className="analog-clock-svg"
                        >
                          {/* Clock Dial */}
                          <circle
                            cx="60"
                            cy="60"
                            r="56"
                            className="clock-dial-bg"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="50"
                            className="clock-dial-ring"
                          />

                          {/* Hour Marks */}
                          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                            (deg) => (
                              <line
                                key={deg}
                                x1="60"
                                y1="13"
                                x2="60"
                                y2={deg % 90 === 0 ? "19" : "16"}
                                stroke={deg % 90 === 0 ? "#0f172a" : "#94a3b8"}
                                strokeWidth={deg % 90 === 0 ? "2.5" : "1.2"}
                                transform={`rotate(${deg} 60 60)`}
                              />
                            )
                          )}

                          {/* Clock Cardinal Numbers */}
                          <text x="60" y="26" textAnchor="middle" className="clock-text">12</text>
                          <text x="98" y="64" textAnchor="middle" className="clock-text">3</text>
                          <text x="60" y="102" textAnchor="middle" className="clock-text">6</text>
                          <text x="22" y="64" textAnchor="middle" className="clock-text">9</text>

                          {/* Hour Hand */}
                          <line
                            x1="60"
                            y1="60"
                            x2="60"
                            y2="32"
                            className="clock-hour-hand"
                            transform={`rotate(${hourAngle} 60 60)`}
                          />

                          {/* Minute Hand */}
                          <line
                            x1="60"
                            y1="60"
                            x2="60"
                            y2="21"
                            className="clock-minute-hand"
                            transform={`rotate(${minuteAngle} 60 60)`}
                          />

                          {/* Center Pin */}
                          <circle cx="60" cy="60" r="4.5" className="clock-pivot" />
                          <circle cx="60" cy="60" r="1.8" fill="#ffffff" />
                        </svg>

                        <div className="digital-time-badge">
                          <Clock size={13} />
                          <span>{formattedCustomTime}</span>
                        </div>
                      </div>

                      {/* CLOCK TIME SELECTORS (STRICTLY FILTERED - NO PAST TIMES) */}
                      <div className="clock-selectors">
                        <div className="time-select-row">
                          {/* HOUR DROPDOWN - ONLY UNEXPIRED HOURS */}
                          <div className="time-field">
                            <label>Hour</label>
                            <select
                              value={customHour}
                              onChange={(e) =>
                                handleCustomHourChange(
                                  parseInt(e.target.value, 10)
                                )
                              }
                            >
                              {availableHours.length > 0 ? (
                                availableHours.map((h) => (
                                  <option key={`${h}-${customAmPm}`} value={h}>
                                    {h < 10 ? `0${h}` : h}
                                  </option>
                                ))
                              ) : (
                                <option value="">No hours</option>
                              )}
                            </select>
                          </div>

                          <span className="time-separator">:</span>

                          {/* MINUTE DROPDOWN - ONLY UNEXPIRED MINUTES FOR SELECTED HOUR */}
                          <div className="time-field">
                            <label>Minute</label>
                            <select
                              value={customMinute}
                              onChange={(e) =>
                                handleCustomMinuteChange(
                                  parseInt(e.target.value, 10)
                                )
                              }
                            >
                              {availableMinutes.map((m) => (
                                <option key={m} value={m}>
                                  {m < 10 ? `0${m}` : m}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* AM / PM SWITCH */}
                          <div className="time-field">
                            <label>AM / PM</label>
                            <div className="ampm-switch">
                              <button
                                type="button"
                                disabled={!isAmAvailable}
                                title={!isAmAvailable ? "AM has passed for today" : ""}
                                className={`ampm-btn ${
                                  customAmPm === "AM" ? "active" : ""
                                } ${!isAmAvailable ? "ampm-disabled" : ""}`}
                                onClick={() => handleCustomAmPmChange("AM")}
                              >
                                AM
                              </button>
                              <button
                                type="button"
                                disabled={!isPmAvailable}
                                className={`ampm-btn ${
                                  customAmPm === "PM" ? "active" : ""
                                } ${!isPmAvailable ? "ampm-disabled" : ""}`}
                                onClick={() => handleCustomAmPmChange("PM")}
                              >
                                PM
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* QUICK POPULAR CHIPS (ONLY UPCOMING UNEXPIRED SLOTS) */}
                        {upcomingQuickChips.length > 0 && (
                          <div className="quick-chips-section">
                            <span className="quick-chips-title">
                              Or select quick upcoming slot:
                            </span>
                            <div className="quick-chips-list">
                              {upcomingQuickChips.map((quick) => {
                                const isCurrent =
                                  selectedTime === quick.label;

                                return (
                                  <button
                                    type="button"
                                    key={quick.label}
                                    className={`quick-chip-btn ${
                                      isCurrent ? "chip-active" : ""
                                    }`}
                                    onClick={() =>
                                      selectQuickConvenientSlot(quick)
                                    }
                                  >
                                    {quick.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {customTimeNotice && (
                          <div className="clock-warning-alert">
                            <AlertCircle size={14} />
                            <span>{customTimeNotice}</span>
                          </div>
                        )}

                        <button
                          type="button"
                          className="apply-clock-btn"
                          disabled={Boolean(customTimeNotice)}
                          onClick={applyCustomConvenientTime}
                        >
                          <Check size={16} />
                          <span>
                            Set Convenient Slot ({formattedCustomTime})
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
                    SELECTED SLOT BADGE
                ================================================= */}
                {!selectedTime && (
                  <p className="book-call-selection-message">
                    Select an available date and time to continue.
                  </p>
                )}

                {selectedTime && (
                  <div className="book-call-selected">
                    <CheckCircle2 size={17} />
                    <span>
                      Selected: <strong>{selectedTime}</strong> ({formattedSelectedDate} • 30 mins)
                    </span>
                    <Clock size={15} className="selected-clock-icon" />
                  </div>
                )}

                {/* QUOTE */}
                <div className="book-call-quote">
                  <p>
                    "A focused conversation can save you months of going in the
                    wrong direction."
                  </p>
                  <strong>— ProJenius Mentor Team</strong>
                </div>

                {/* BOOK BUTTON */}
                <button
                  type="button"
                  className="book-call-button"
                  disabled={!selectedTime || !termsAccepted}
                  onClick={handleProceedToDetails}
                >
                  <span>Proceed to Booking Details</span>
                  <ArrowRight size={20} />
                </button>

                {/* TERMS CHECKBOX */}
                <div className="book-call-terms-box">
                  <label className="book-call-terms-check">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(event) =>
                        setTermsAccepted(event.target.checked)
                      }
                    />
                    <span className="book-call-custom-check"></span>
                    <span className="book-call-terms-text">
                      I have read and agree to the{" "}
                      <button type="button" onClick={handleTermsClick}>
                        Terms & Conditions
                      </button>
                      .
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* =========================================================
                STEP 2: ATTENDEE DETAILS
            ========================================================= */}
            {currentStep === 2 && (
              <form onSubmit={handleSubmitBooking} className="book-call-form">
                {/* SLOT SUMMARY RECAP */}
                <div className="book-call-recap-banner">
                  <div className="recap-info">
                    <CalendarDays size={16} />
                    <span>
                      {formattedSelectedDate} at <strong>{selectedTime}</strong> (30 min call)
                    </span>
                  </div>
                  <button
                    type="button"
                    className="recap-change-btn"
                    onClick={() => setCurrentStep(1)}
                  >
                    Change Slot
                  </button>
                </div>

                <div className="form-head">
                  <h3>Your Information</h3>
                  <p>
                    Provide your details so our mentor can review your profile
                    and send your Google Meet invite.
                  </p>
                </div>

                {/* FULL NAME */}
                <div className="form-group">
                  <label>
                    <User size={15} /> Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={formErrors.name ? "input-error" : ""}
                  />
                  {formErrors.name && (
                    <span className="error-text">{formErrors.name}</span>
                  )}
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label>
                    <Mail size={15} /> Email Address (For Meet Link){" "}
                    <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rahul.sharma@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={formErrors.email ? "input-error" : ""}
                  />
                  {formErrors.email && (
                    <span className="error-text">{formErrors.email}</span>
                  )}
                </div>

                {/* PHONE */}
                <div className="form-group">
                  <label>
                    <Phone size={15} /> WhatsApp / Mobile Number{" "}
                    <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={formErrors.phone ? "input-error" : ""}
                  />
                  {formErrors.phone && (
                    <span className="error-text">{formErrors.phone}</span>
                  )}
                </div>

                {/* TARGET ROLE */}
                <div className="form-group">
                  <label>
                    <Sparkles size={15} /> What role are you preparing for?
                  </label>
                  <select
                    value={formData.targetRole}
                    onChange={(e) =>
                      setFormData({ ...formData, targetRole: e.target.value })
                    }
                  >
                    {TARGET_ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* NOTES */}
                <div className="form-group">
                  <label>What is your biggest question / challenge right now? (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. How to prepare for campus placement, resume critique, career shift into AI/Fullstack..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>

                {/* BUTTONS */}
                <div className="form-action-row">
                  <button
                    type="button"
                    className="book-call-back-btn"
                    disabled={isSubmitting}
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    className="book-call-button flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={18} className="payment-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* =========================================================
                STEP 3: CONFIRMATION STATE (BOOKING CONFIRMED)
            ========================================================= */}
            {currentStep === 3 && (
              <div className="book-call-success-flow">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={54} />
                </div>

                <h3>Session Confirmed!</h3>
                <p className="success-subtitle">
                  We're excited to mentor you! An invitation and Google Meet link have been sent to <strong>{formData.email}</strong>.
                </p>

                <div className="booking-ref-badge">
                  <span>Booking Reference:</span>
                  <strong>{bookingId || "PJ-2026-84921"}</strong>
                </div>

                {/* DETAILS SUMMARY */}
                <div className="confirmed-details-card">
                  <div className="detail-item">
                    <CalendarDays size={16} />
                    <div>
                      <small>Date & Time</small>
                      <strong>
                        {formattedSelectedDate} at {selectedTime}
                      </strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Clock3 size={16} />
                    <div>
                      <small>Duration</small>
                      <strong>30 Minutes (1:1 Mentoring)</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <User size={16} />
                    <div>
                      <small>Candidate</small>
                      <strong>{formData.name || "Student"}</strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Smartphone size={16} />
                    <div>
                      <small>Meeting Platform</small>
                      <strong>Google Meet (Video Call)</strong>
                    </div>
                  </div>
                </div>

                {/* MEETING LINK BOX */}
                <div className="meet-link-box">
                  <div className="meet-url-text">
                    <small>Google Meet Link:</small>
                    <code>https://meet.google.com/prj-career-call</code>
                  </div>
                  <button
                    type="button"
                    className="copy-link-btn"
                    onClick={handleCopyMeetLink}
                  >
                    <Copy size={14} />
                    <span>{copiedLink ? "Copied! ✓" : "Copy Link"}</span>
                  </button>
                </div>

                {/* CALENDAR & MEET ACTIONS */}
                <div className="confirmed-action-buttons">
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-calendar"
                  >
                    <Calendar size={16} />
                    <span>Add to Google Calendar</span>
                  </a>

                  <a
                    href="https://meet.google.com/prj-career-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-join-meet"
                  >
                    <ExternalLink size={16} />
                    <span>Test Google Meet</span>
                  </a>
                </div>

                {/* BOOK ANOTHER SESSION */}
                <button
                  type="button"
                  className="book-another-btn"
                  onClick={handleResetBooking}
                >
                  Book Another Call
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCall;