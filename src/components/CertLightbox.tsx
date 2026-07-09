"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type CertView = { src: string; alt: string; title: string; subtitle: string };

/**
 * Shared certificate viewer — a framed image in a dismissible lightbox.
 * Rendered through a portal to <body> so its position:fixed escapes any
 * transformed ancestor (e.g. the scroll-reveal wrapper).
 */
export default function CertLightbox({ cert, onClose }: { cert: CertView | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {cert && (
        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="lb-frame"
            style={{ maxWidth: 960, width: "100%" }}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              width={960}
              height={620}
              sizes="(max-width: 900px) 92vw, 960px"
              style={{ objectFit: "contain", width: "100%", height: "auto", display: "block" }}
            />
            <div className="telem-bar" style={{ padding: "12px 16px" }}>
              <span className="id">{cert.title}</span>
              <span>{cert.subtitle}</span>
            </div>
            <button className="lb-btn" style={{ top: 12, right: 12 }} onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close">✕</button>
          </motion.div>
          <div className="lb-hint">click outside to close</div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
