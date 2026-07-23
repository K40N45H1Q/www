"use client";

import { useEffect, useRef } from "react";
import styles from "./GridBackground.module.css";

const GRID_CONSTANTS = {
  densityFactor: 0.01,
  minParticles: 50,
  maxParticles: 50,
  speedMultiplier: 1,
  maxConnectionDistance: 300,
  lineWidth: 0.5,
};

const PARTICLE_CONSTANTS = {
  radius: 3,
  minVelocity: -0.5,
  maxVelocity: 0.5,
};

const FIXED_CANVAS_WIDTH = 1920;
const FIXED_CANVAS_HEIGHT = 1080;

type Particle = {
  radius: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function calculateParticleCount() {
  const calculated = Math.floor(
    ((FIXED_CANVAS_WIDTH * FIXED_CANVAS_HEIGHT) / 1000) *
      GRID_CONSTANTS.densityFactor,
  );

  return Math.max(
    GRID_CONSTANTS.minParticles,
    Math.min(GRID_CONSTANTS.maxParticles, calculated),
  );
}

function createParticle(): Particle {
  return {
    x: randomBetween(0, FIXED_CANVAS_WIDTH),
    y: randomBetween(0, FIXED_CANVAS_HEIGHT),
    radius: PARTICLE_CONSTANTS.radius,
    velocityX: randomBetween(
      PARTICLE_CONSTANTS.minVelocity,
      PARTICLE_CONSTANTS.maxVelocity,
    ),
    velocityY: randomBetween(
      PARTICLE_CONSTANTS.minVelocity,
      PARTICLE_CONSTANTS.maxVelocity,
    ),
  };
}

function updateParticle(particle: Particle) {
  particle.x += particle.velocityX * GRID_CONSTANTS.speedMultiplier;
  particle.y += particle.velocityY * GRID_CONSTANTS.speedMultiplier;

  if (particle.x < 0) {
    particle.x = FIXED_CANVAS_WIDTH;
  }

  if (particle.x > FIXED_CANVAS_WIDTH) {
    particle.x = 0;
  }

  if (particle.y < 0) {
    particle.y = FIXED_CANVAS_HEIGHT;
  }

  if (particle.y > FIXED_CANVAS_HEIGHT) {
    particle.y = 0;
  }
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const currentCanvas = canvas;
    const canvasContext = currentCanvas.getContext("2d");

    if (!canvasContext) {
      return;
    }

    const context = canvasContext;
    currentCanvas.width = FIXED_CANVAS_WIDTH;
    currentCanvas.height = FIXED_CANVAS_HEIGHT;

    const particles = Array.from(
      { length: calculateParticleCount() },
      createParticle,
    );

    let animationFrameId = 0;
    let gridColor = getComputedStyle(currentCanvas).color;

    function getGridColor() {
      return getComputedStyle(currentCanvas).color;
    }

    function drawParticle(particle: Particle, color: string) {
      context.beginPath();
      context.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2,
      );
      context.fillStyle = color;
      context.fill();
    }

    function drawConnections(color: string) {
      context.strokeStyle = color;
      context.lineWidth = GRID_CONSTANTS.lineWidth;

      particles.forEach((particleA, index) => {
        particles.slice(index + 1).forEach((particleB) => {
          const distance = Math.hypot(
            particleA.x - particleB.x,
            particleA.y - particleB.y,
          );

          if (distance < GRID_CONSTANTS.maxConnectionDistance) {
            context.beginPath();
            context.moveTo(particleA.x, particleA.y);
            context.lineTo(particleB.x, particleB.y);
            context.stroke();
          }
        });
      });
    }

    function animate() {
      gridColor = getGridColor();

      context.clearRect(
        0,
        0,
        FIXED_CANVAS_WIDTH,
        FIXED_CANVAS_HEIGHT,
      );

      particles.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle, gridColor);
      });

      drawConnections(gridColor);
      animationFrameId = requestAnimationFrame(animate);
    }

    const themeObserver = new MutationObserver(() => {
      gridColor = getGridColor();
    });

    themeObserver.observe(document.documentElement, {
      attributeFilter: ["data-theme", "class"],
      attributes: true,
    });

    animate();

    return () => {
      themeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.gridBackground}
      aria-hidden="true"
    />
  );
}
