import React from "react";
import "./BeadPreview.css";
import { splitLetters } from "../../splitLetters";
import { MOTI_COLOURS, THREAD_HEX } from "../../storeConfig";

export const motiHex = (colourName) =>
  MOTI_COLOURS.find((c) => c.name === colourName)?.hex || MOTI_COLOURS[0].hex;

// a name drawn as Moti beads on the maroon thread, so the spelling and colour are easy to check
const BeadPreview = ({ text, colour, small = false }) => {
  const letters = splitLetters(text || "");
  return (
    <div
      className={`bead-preview ${small ? "bead-preview-sm" : ""}`}
      style={{ "--thread": THREAD_HEX, "--moti": motiHex(colour) }}
      aria-label={letters.length ? `Preview: ${letters.join(" ")}` : undefined}>
      <div className='bead-preview-panel'>
        {letters.length > 0 ? (
          letters.map((letter, i) => <span key={i}>{letter}</span>)
        ) : (
          <em>Your name appears here</em>
        )}
      </div>
    </div>
  );
};

export default BeadPreview;
