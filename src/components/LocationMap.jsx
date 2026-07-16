import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react"
import "./LocationMap.css"

export default function LocationMap({
  location = "Surabaya, Indonesia",
  coordinates = "7.2504° S, 112.7688° E",
  className = ""
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleClick = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <motion.div
      ref={containerRef}
      className={`locmap-root ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="locmap-card"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          width: isExpanded ? 360 : 240,
          height: isExpanded ? 280 : 140,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
      >
        <div className="locmap-overlay" />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="locmap-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="locmap-expanded-bg" />

              <svg className="locmap-svg" preserveAspectRatio="none">
                <motion.line
                  x1="0%" y1="35%" x2="100%" y2="35%"
                  className="locmap-road locmap-road-main"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.line
                  x1="0%" y1="65%" x2="100%" y2="65%"
                  className="locmap-road locmap-road-main"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.line
                  x1="30%" y1="0%" x2="30%" y2="100%"
                  className="locmap-road locmap-road-v"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <motion.line
                  x1="70%" y1="0%" x2="70%" y2="100%"
                  className="locmap-road locmap-road-v"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
                {[20, 50, 80].map((y, i) => (
                  <motion.line
                    key={`h-${i}`}
                    x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                    className="locmap-road locmap-road-sec"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line
                    key={`v-${i}`}
                    x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                    className="locmap-road locmap-road-sec"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  />
                ))}
              </svg>

              <motion.div
                className="locmap-building locmap-building-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
              <motion.div
                className="locmap-building locmap-building-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
              <motion.div
                className="locmap-building locmap-building-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              />
              <motion.div
                className="locmap-building locmap-building-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
              />
              <motion.div
                className="locmap-building locmap-building-5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.65 }}
              />
              <motion.div
                className="locmap-building locmap-building-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.75 }}
              />

              <motion.div
                className="locmap-pin"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="locmap-pin-svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" className="locmap-pin-fill" />
                  <circle cx="12" cy="9" r="2.5" className="locmap-pin-dot" />
                </svg>
              </motion.div>

              <div className="locmap-vignette" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="locmap-grid"
          animate={{ opacity: isExpanded ? 0 : 0.03 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" className="locmap-grid-svg">
            <defs>
              <pattern id="locmap-grid-pat" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" className="locmap-grid-path" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#locmap-grid-pat)" />
          </svg>
        </motion.div>

        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative' }}>
              <motion.div
                style={{ position: 'relative' }}
                animate={{ opacity: isExpanded ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ color: 'var(--blue)' }}
                  animate={{
                    filter: isHovered
                      ? "drop-shadow(0 0 8px color-mix(in srgb, var(--blue) 60%, transparent))"
                      : "drop-shadow(0 0 4px color-mix(in srgb, var(--blue) 30%, transparent))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" x2="9" y1="3" y2="18" />
                  <line x1="15" x2="15" y1="6" y2="21" />
                </motion.svg>
              </motion.div>
            </div>

            <motion.div
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.25rem 0.5rem', borderRadius: '9999px',
                backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
              }}
              animate={{
                scale: isHovered ? 1.05 : 1,
                backgroundColor: isHovered
                  ? 'color-mix(in srgb, var(--text) 8%, transparent)'
                  : 'color-mix(in srgb, var(--text) 5%, transparent)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)' }} />
              <span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--muted)', letterSpacing: '0.025em', textTransform: 'uppercase' }}>Live</span>
            </motion.div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <motion.h3
              style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '-0.01em' }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  style={{ color: 'var(--muted)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              style={{ height: '1px', background: `linear-gradient(to right, color-mix(in srgb, var(--blue) 50%, transparent), color-mix(in srgb, var(--blue) 30%, transparent), transparent)` }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        style={{
          position: 'absolute', bottom: '-1.5rem', left: '50%',
          fontSize: '10px', color: 'var(--muted-2)', whiteSpace: 'nowrap',
          x: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered && !isExpanded ? 1 : 0,
          y: isHovered ? 0 : 4,
        }}
        transition={{ duration: 0.2 }}
      >
        Click to expand
      </motion.p>
    </motion.div>
  )
}
