import { useState, useEffect } from "react";

export default function CurrentTime({ H = true, M = true, S = false }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = H ? now.getHours().toString().padStart(2, "0") : null;
      const minutes = M ? now.getMinutes().toString().padStart(2, "0") : null;
      const seconds = S ? now.getSeconds().toString().padStart(2, "0") : null;

      const formattedTime = [
        hours,
        minutes,
        seconds
      ]
        .filter((part) => part !== null) // Supprimer les parties nulles
        .join(":");

      setTime(formattedTime);
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(intervalId);
  }, [H, M, S]);

  return time;
}
