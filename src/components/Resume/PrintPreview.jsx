import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const PrintPreview = ({ children, isActive = false }) => {
  const contentRef = useRef(null);
  const [pageBreaks, setPageBreaks] = useState([]);
  const [contentHeight, setContentHeight] = useState(0);
  
  // Page dimensions in pixels (8.5" x 11" at 96 DPI)
  // const PAGE_WIDTH = 8.5 * 96; // 816px - unused
  const PAGE_HEIGHT = 11 * 96; // 1056px
  const PADDING = 0.05 * 96; // 4.8px (matching our 0.05in padding)
  const USABLE_HEIGHT = PAGE_HEIGHT - (PADDING * 2);
  
  useEffect(() => {
    if (!isActive || !contentRef.current) return;
    
    const calculatePageBreaks = () => {
      const content = contentRef.current;
      const totalHeight = content.scrollHeight;
      setContentHeight(totalHeight);
      
      // Calculate page breaks
      const breaks = [];
      let currentPage = 1;
      let pageHeight = USABLE_HEIGHT;
      
      while (pageHeight < totalHeight) {
        breaks.push({
          page: currentPage,
          position: pageHeight
        });
        currentPage++;
        pageHeight += USABLE_HEIGHT;
      }
      
      setPageBreaks(breaks);
    };
    
    // Calculate on mount and resize
    calculatePageBreaks();
    window.addEventListener('resize', calculatePageBreaks);
    
    // Use MutationObserver to detect content changes
    const observer = new MutationObserver(calculatePageBreaks);
    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
    
    return () => {
      window.removeEventListener('resize', calculatePageBreaks);
      observer.disconnect();
    };
  }, [isActive, USABLE_HEIGHT]);
  
  const currentPages = Math.ceil(contentHeight / USABLE_HEIGHT) || 1;
  
  return (
    <>
      <style jsx>{`
        .print-preview-container {
          position: relative;
        }
        
        .print-preview-indicators {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          background: white;
          border: 2px solid #333;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          min-width: 200px;
        }
        
        .preview-title {
          font-weight: bold;
          margin-bottom: 12px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .preview-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .page-info {
          font-size: 13px;
          margin-bottom: 8px;
        }
        
        .page-count {
          font-size: 18px;
          font-weight: bold;
          color: ${currentPages > 1 ? '#e53e3e' : '#38a169'};
          margin-bottom: 4px;
        }
        
        .page-status {
          font-size: 12px;
          color: ${currentPages > 1 ? '#e53e3e' : '#38a169'};
          margin-bottom: 12px;
        }
        
        .overflow-info {
          font-size: 12px;
          color: #666;
          padding: 8px;
          background: #f7fafc;
          border-radius: 4px;
          margin-top: 8px;
        }
        
        .page-break-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: repeating-linear-gradient(
            90deg,
            #e53e3e,
            #e53e3e 10px,
            transparent 10px,
            transparent 20px
          );
          z-index: 999;
          pointer-events: none;
        }
        
        .page-break-label {
          position: absolute;
          right: 10px;
          top: -18px;
          background: #e53e3e;
          color: white;
          padding: 2px 8px;
          font-size: 11px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .content-wrapper {
          position: relative;
        }
        
        .mini-pages {
          display: flex;
          gap: 4px;
          margin-top: 12px;
        }
        
        .mini-page {
          width: 30px;
          height: 40px;
          border: 1px solid #ccc;
          background: white;
          position: relative;
          border-radius: 2px;
          overflow: hidden;
        }
        
        .mini-page-number {
          position: absolute;
          bottom: 2px;
          right: 2px;
          font-size: 9px;
          color: #666;
        }
        
        .mini-page-filled {
          background: #e6f3ff;
        }
        
        .mini-page.overflow {
          border-color: #e53e3e;
        }
        
        .section-info {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
        }
        
        .section-title {
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
        }
        
        .section-item {
          font-size: 11px;
          color: #666;
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
        }
        
        .on-page {
          color: #38a169;
          font-weight: bold;
        }
        
        .off-page {
          color: #e53e3e;
          font-weight: bold;
        }
      `}</style>
      
      <div className="print-preview-container">
        {isActive && (
          <div className="print-preview-indicators">
            <div className="preview-title">
              <span className="preview-icon">📄</span>
              Print Preview
            </div>
            
            <div className="page-count">{currentPages} Page{currentPages !== 1 ? 's' : ''}</div>
            <div className="page-status">
              {currentPages === 1 ? '✓ Fits on one page' : '⚠️ Content overflows'}
            </div>
            
            <div className="mini-pages">
              {[...Array(Math.max(currentPages, 2))].map((_, index) => (
                <div key={index} className={`mini-page ${index >= 1 && currentPages > 1 ? 'overflow' : ''}`}>
                  <div 
                    className="mini-page-filled" 
                    style={{
                      height: index === currentPages - 1 
                        ? `${((contentHeight % USABLE_HEIGHT) / USABLE_HEIGHT) * 100}%`
                        : index < currentPages - 1 ? '100%' : '0%'
                    }}
                  />
                  <div className="mini-page-number">{index + 1}</div>
                </div>
              ))}
            </div>
            
            {currentPages > 1 && (
              <div className="overflow-info">
                <strong>Overflow:</strong> {Math.round(contentHeight - USABLE_HEIGHT)}px
                <br />
                <strong>Suggestion:</strong> Hide sections or reduce bullets
              </div>
            )}
            
            <div className="section-info">
              <div className="section-title">Content on Each Page</div>
              <div className="section-item">
                <span>Header & Skills</span>
                <span className="on-page">Page 1</span>
              </div>
              <div className="section-item">
                <span>Education</span>
                <span className="on-page">Page 1</span>
              </div>
              <div className="section-item">
                <span>Experience</span>
                <span className={contentHeight > USABLE_HEIGHT * 0.5 ? 'off-page' : 'on-page'}>
                  {contentHeight > USABLE_HEIGHT * 0.5 ? 'Page 1-2' : 'Page 1'}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="content-wrapper" ref={contentRef}>
          {children}
          
          {isActive && pageBreaks.map((breakPoint, index) => (
            <div 
              key={index}
              className="page-break-line" 
              style={{ top: `${breakPoint.position}px` }}
            >
              <div className="page-break-label">Page {breakPoint.page + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

PrintPreview.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool
};

export default PrintPreview;