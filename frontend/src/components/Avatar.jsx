import React, { useState, useEffect, useMemo } from "react";

const sizeConfig = {
  sm: { container: "w-14 h-14", text: "text-sm" },
  md: { container: "w-20 h-20", text: "text-2xl" },
  lg: { container: "w-32 h-32", text: "text-4xl" },
};

export default function Avatar({ username, frame = {}, size = "lg" }) {
  const cfg = sizeConfig[size] || sizeConfig.lg;
  const firstChar = username ? username.charAt(0).toUpperCase() : "?";
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    if (!frame.maskUrl) {
      setYOffset(0);
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = frame.maskUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let minY = canvas.height;
        let maxY = -1;

        for (let i = 0; i < data.length; i += 4) {
          if (data[i] > 0) { // Check for non-black pixels
            const y = Math.floor((i / 4) / canvas.width);
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }

        if (maxY !== -1) {
          const visualCenterPx = (minY + maxY) / 2;
          const geometricCenterPx = canvas.height / 2;
          const pixelOffset = visualCenterPx - geometricCenterPx;
          const percentageOffset = (pixelOffset / canvas.height) * 100;
          setYOffset(percentageOffset);
        }
      } catch (e) {
        console.error("Could not process image for centering:", e);
        setYOffset(0);
      }
    };

    img.onerror = () => {
        console.error("Failed to load mask image for centering.");
        setYOffset(0);
    }
  }, [frame.maskUrl]);

  const maskStyles = useMemo(() => ({
    maskImage: `url(${frame.maskUrl})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
    maskMode: 'luminance',
    WebkitMaskImage: `url(${frame.maskUrl})`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
  }), [frame.maskUrl]);

  return (
    <div className={`relative ${cfg.container}`}>
      {/* This renders if a mask is present */}
      {frame.maskUrl && (
        <>
          {/* Layer 1: The shaped gradient background. */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-avatar-gradient-start to-avatar-gradient-end"
            style={maskStyles}
          />
          {/* Layer 2: The text, with the identical mask and transform applied. */}
          <div
            className={`absolute inset-0 flex items-center justify-center font-bold ${cfg.text} text-white`}
            style={{ ...maskStyles, transform: `translateY(${yOffset}%)` }}
          >
            <span className="leading-none">{firstChar}</span>
          </div>
        </>
      )}

      {/* Fallback for default frame with no mask */}
      {!frame.maskUrl && (
         <div className="w-full h-full p-3">
            <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-5xl bg-gradient-to-tr from-avatar-gradient-start to-avatar-gradient-end text-white">
                <span className="leading-none">{firstChar}</span>
            </div>
         </div>
      )}

      {/* Frame image sits on top */}
      {frame?.frameUrl && (
        <img
          src={frame.frameUrl}
          alt="Equipped Frame"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
      )}
    </div>
  );
}

