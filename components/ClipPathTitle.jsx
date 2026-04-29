const ClipPathTitle = ({ title, color, bg, className, borderColor }) => {
  return (
    <div
      style={{
        fontSize: "clamp(1.35rem, 7.8vw, 7.2rem)",
        fontWeight: 700,
        textTransform: "uppercase",
        lineHeight: 0.92,
        letterSpacing: "clamp(-0.04em, -0.15vw, -0.08em)",
      }}
    >
      <div
        style={{
          clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          borderColor: borderColor,
        }}
        className={`${className} border-[.5vw] text-nowrap opacity-0`}
      >
        <div
          className="px-3 pt-3 pb-4 md:px-14 md:pt-0 md:pb-5"
          style={{
            backgroundColor: bg,
          }}
        >
          <h2
            style={{
              color: color,
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ClipPathTitle;
