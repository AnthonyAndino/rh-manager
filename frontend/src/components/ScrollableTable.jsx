import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScrollableTable({ children, maxHeight }) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    setIsScrolled(el.scrollTop > 2);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll);
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      ro.disconnect();
    };
  }, [children]);

  const scroll = (dir) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative' }}>
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: 32,
            height: 56,
            border: '1px solid var(--border-color)',
            borderLeft: 'none',
            borderRadius: '0 10px 10px 0',
            background: 'rgba(255,255,255,0.95)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 0 12px rgba(44,43,41,0.08)',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary-terracotta)'; e.currentTarget.style.boxShadow = '2px 0 16px rgba(233,105,68,0.15)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.boxShadow = '2px 0 12px rgba(44,43,41,0.08)' }}
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: 32,
            height: 56,
            border: '1px solid var(--border-color)',
            borderRight: 'none',
            borderRadius: '10px 0 0 10px',
            background: 'rgba(255,255,255,0.95)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '-2px 0 12px rgba(44,43,41,0.08)',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary-terracotta)'; e.currentTarget.style.boxShadow = '-2px 0 16px rgba(233,105,68,0.15)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.boxShadow = '-2px 0 12px rgba(44,43,41,0.08)' }}
        >
          <ChevronRight size={18} />
        </button>
      )}
      <div
        ref={containerRef}
        className={`table-container${isScrolled ? ' is-scrolled' : ''}`}
        style={maxHeight ? { maxHeight } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
