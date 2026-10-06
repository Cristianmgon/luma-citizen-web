"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface LumaCuidadoraAvatarProps {
  className?: string;
  alt?: string;
  /** Duración del ciclo completo en segundos (animación ~10s + pausa). Por defecto 16s (10s anim + 6s pausa). */
  loopIntervalSeconds?: number;
  /** Si permite reiniciar la animación al tocar/hacer clic en la mascota. */
  interactive?: boolean;
}

export default function LumaCuidadoraAvatar({
  className = "relative z-10 w-full h-auto drop-shadow-2xl transition hover:scale-105 duration-300",
  alt = "Luma Cuidadora - Personaje Guardián Protector",
  loopIntervalSeconds = 16,
  interactive = true,
}: LumaCuidadoraAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<Blob | null>(null);
  const currentBlobUrlRef = useRef<string | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fuente inicial: fallback estático ligero para primer render instantáneo sin CLS
  const [imgSrc, setImgSrc] = useState<string>("/images/luma_home_animation_fallback.png");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [tapFeedback, setTapFeedback] = useState<boolean>(false);

  // Dispara o reinicia la animación WebP desde el frame 0 sin consumo de red adicional
  const restartAnimation = useCallback(() => {
    if (!blobRef.current) return;

    // Liberar URL previa para prevenir cualquier fuga de memoria en el navegador móvil
    if (currentBlobUrlRef.current) {
      URL.revokeObjectURL(currentBlobUrlRef.current);
    }

    const newUrl = URL.createObjectURL(blobRef.current);
    currentBlobUrlRef.current = newUrl;
    setImgSrc(newUrl);
    setIsAnimating(true);

    // Tras los ~10s de la animación nativa, marcamos estado en reposo
    setTimeout(() => {
      setIsAnimating(false);
    }, 10000);
  }, []);

  // 1. Cargar el WebP en memoria (Blob) una sola vez al montar
  useEffect(() => {
    let isMounted = true;

    // Respetar preferencia de reducción de movimiento del usuario
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    fetch("/images/luma_animada_transparente.webp")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        if (!isMounted) return;
        blobRef.current = blob;
        setIsReady(true);

        // Si ya está visible en el viewport y el usuario no pidió reducir movimiento, activar de inmediato
        if (isVisibleRef.current && !prefersReducedMotion) {
          restartAnimation();
        }
      })
      .catch((err) => {
        console.warn("LumaCuidadoraAvatar: no se pudo cargar el blob animado, usando src directo", err);
        // Fallback: usar src estático directo
        if (isMounted) {
          setImgSrc("/images/luma_animada_transparente.webp");
        }
      });

    return () => {
      isMounted = false;
      if (currentBlobUrlRef.current) {
        URL.revokeObjectURL(currentBlobUrlRef.current);
      }
    };
  }, [restartAnimation]);

  // 2. IntersectionObserver: Detectar llegada a la imagen (en móvil y desktop)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      const isIntersecting = entry.isIntersecting;
      isVisibleRef.current = isIntersecting;

      if (isIntersecting) {
        // Al entrar en el campo visual: reiniciar la animación para que se vea completa desde el inicio
        if (blobRef.current && !prefersReducedMotion) {
          restartAnimation();
        }

        // Iniciar el bucle periódico mientras esté visible
        if (!prefersReducedMotion && loopIntervalSeconds > 0) {
          if (loopTimerRef.current) clearInterval(loopTimerRef.current);
          loopTimerRef.current = setInterval(() => {
            if (isVisibleRef.current && blobRef.current) {
              restartAnimation();
            }
          }, loopIntervalSeconds * 1000);
        }
      } else {
        // Al salir del viewport: pausar el temporizador para ahorrar batería y CPU del móvil
        if (loopTimerRef.current) {
          clearInterval(loopTimerRef.current);
          loopTimerRef.current = null;
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // viewport
      threshold: 0.25, // Cuando al menos 25% de la imagen entra en pantalla
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (loopTimerRef.current) {
        clearInterval(loopTimerRef.current);
        loopTimerRef.current = null;
      }
    };
  }, [restartAnimation, loopIntervalSeconds]);

  // 3. Interacción táctil en celular o clic en PC
  const handleUserTap = () => {
    if (!interactive) return;

    restartAnimation();
    setTapFeedback(true);
    setTimeout(() => setTapFeedback(false), 2400);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        interactive ? "cursor-pointer" : ""
      }`}
      onClick={handleUserTap}
      title={interactive ? "Toca a Luma para ver su saludo protector" : alt}
      role={interactive ? "button" : "img"}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleUserTap();
        }
      }}
      aria-label={alt}
    >
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${
          tapFeedback ? "scale-105 filter drop-shadow-[0_0_24px_rgba(59,130,246,0.6)]" : ""
        }`}
        loading="eager"
        decoding="async"
      />

      {/* Tooltip / Burbuja empática breve al tocarla en el celular */}
      {tapFeedback && (
        <div className="absolute -top-10 sm:-top-12 z-20 animate-bounce rounded-full bg-blue-600/95 px-3 py-1 text-[11px] sm:text-xs font-bold text-white shadow-lg backdrop-blur-sm border border-blue-300/40 pointer-events-none">
          ✨ ¡Luma está lista para cuidarte!
        </div>
      )}

      {/* Indicador sutil de estado vivo en reposo */}
      {isReady && !isAnimating && (
        <span
          className="pointer-events-none absolute bottom-1 right-2 flex h-2.5 w-2.5 items-center justify-center"
          title="Luma en vigilia"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      )}
    </div>
  );
}
