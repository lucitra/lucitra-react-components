import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { resumeDesignSystem } from './resumeStyles.js';
import AITextInput from './AITextInput.jsx';
import SignatureSelector from './SignatureSelector.jsx';
import { SIGNATURE_FONTS } from './signatureFonts.js';

const CoverLetter = ({ 
  resumeData, 
  jobDescription = '',
  companyName = '',
  hiringManagerName = '',
  recipientName = '',
  onUpdate,
  userSubscription = 'free',
  remainingCredits = 3,
  onUpgrade = () => {},
  onCreditUsed = () => {},
  onVersionTrack = () => {},
  printMode = false,
  useSerifFont = false,
  initialContent = null
}) => {
  const getSalutation = () => {
    if (recipientName) return `Dear ${recipientName}`;
    if (hiringManagerName) return `Dear ${hiringManagerName}`;
    return 'Dear Hiring Manager';
  };

  const [coverLetterData, setCoverLetterData] = useState(initialContent || {
    salutation: getSalutation(),
    opening: '',
    body1: '',
    body2: '',
    body3: '',
    closing: '',
    signOff: 'Sincerely'
  });

  const [signatureFont, setSignatureFont] = useState('none');
  const [customSignatureFont, setCustomSignatureFont] = useState(null);

  const handleFieldUpdate = useCallback((field, value) => {
    const updatedData = {
      ...coverLetterData,
      [field]: value
    };
    setCoverLetterData(updatedData);
    if (onUpdate) {
      onUpdate(updatedData);
    }
  }, [coverLetterData, onUpdate]);

  const generateFullLetter = useCallback(() => {
    const { salutation, opening, body1, body2, body3, closing, signOff } = coverLetterData;
    
    const paragraphs = [opening, body1, body2, body3, closing].filter(p => p && p.trim());
    
    if (paragraphs.length === 0) return '';
    
    return `${salutation},

${paragraphs.join('\n\n')}

${signOff},`;
  }, [coverLetterData]);

  const exportCoverLetter = useCallback((format) => {
    const fullLetter = generateFullLetter();
    
    if (format === 'text') {
      // For text export, add signature notation and typed name
      const signatureText = signatureFont !== 'none' 
        ? `${fullLetter}\n[Digital Signature: ${resumeData.basics.name}]\n${resumeData.basics.name}`
        : `${fullLetter}\n${resumeData.basics.name}`;
      
      const blob = new Blob([signatureText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cover_letter_${companyName.replace(/\s+/g, '_') || 'draft'}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // Set print mode and trigger print
      window.print();
    }
  }, [companyName, generateFullLetter, signatureFont, resumeData.basics.name]);

  const aiContext = {
    jobDescription,
    targetRole: resumeData.basics.label,
    companyName,
    candidateName: resumeData.basics.name,
    candidateSummary: resumeData.basics.summary,
    relevantExperience: resumeData.work.slice(0, 3).map(w => ({
      company: w.company,
      position: w.positions?.[0]?.title || w.position,
      highlights: w.positions?.[0]?.highlights || w.highlights
    }))
  };

  return (
    <>
      <style jsx={true}>{`
        .cover-letter-container {
          max-width: ${printMode ? '8.5in' : '800px'};
          margin: 0 auto;
          padding: ${printMode ? '0.5in' : '40px'};
          background: white;
          font-family: ${useSerifFont ? resumeDesignSystem.layout.serifFontFamily : resumeDesignSystem.layout.fontFamily};
        }

        .cover-letter-header {
          margin-bottom: ${printMode ? '0.5in' : '40px'};
        }

        .sender-info {
          margin-bottom: ${printMode ? '0.25in' : '20px'};
        }

        .sender-name {
          font-size: ${printMode ? '14pt' : '18px'};
          font-weight: 700;
          margin-bottom: 4px;
        }

        .sender-contact {
          font-size: ${printMode ? '11pt' : '14px'};
          color: #555;
          line-height: 1.4;
        }

        .date {
          margin-bottom: ${printMode ? '0.25in' : '20px'};
          font-size: ${printMode ? '11pt' : '14px'};
        }

        .recipient-info {
          margin-bottom: ${printMode ? '0.25in' : '20px'};
        }

        .company-name {
          font-size: ${printMode ? '12pt' : '16px'};
          font-weight: 600;
          margin-bottom: 4px;
        }

        .hiring-manager {
          font-size: ${printMode ? '11pt' : '14px'};
          color: #555;
        }

        .letter-body {
          line-height: ${printMode ? '1.5' : '1.6'};
          font-size: ${printMode ? '11pt' : '14px'};
          color: #333;
        }

        .salutation {
          margin-bottom: ${printMode ? '0.15in' : '15px'};
          font-size: ${printMode ? '11pt' : '14px'};
        }

        .paragraph {
          margin-bottom: ${printMode ? '0.15in' : '15px'};
          text-align: justify;
        }

        .sign-off {
          margin-top: ${printMode ? '0.25in' : '25px'};
          margin-bottom: ${printMode ? '0.5in' : '50px'};
          font-size: ${printMode ? '11pt' : '14px'};
        }

        .signature {
          font-size: ${printMode ? '11pt' : '14px'};
          font-weight: 600;
        }

        .editor-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #333;
        }

        .field-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
          color: #555;
        }

        .text-input {
          width: 100%;
          min-height: 100px;
          margin-bottom: 16px;
        }

        .controls {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e0e0e0;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: #333;
          color: white;
        }

        .btn-primary:hover {
          background-color: #222;
        }

        .btn-secondary {
          background-color: #666;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #555;
        }

        .preview-mode {
          background: #f8f9fa;
          padding: 40px;
          border-radius: 8px;
        }

        .preview-letter {
          background: white;
          padding: 40px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          white-space: pre-wrap;
          font-family: ${useSerifFont ? resumeDesignSystem.layout.serifFontFamily : resumeDesignSystem.layout.fontFamily};
          line-height: 1.6;
        }

        @media print {
          .cover-letter-container {
            padding: 0;
            margin: 0;
          }

          .editor-section,
          .controls,
          .signature-selector {
            display: none !important;
          }

          .preview-mode {
            background: white;
            padding: 0;
          }

          .preview-letter {
            box-shadow: none;
            padding: 0;
          }

          .signature {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <div className="cover-letter-container">
        {!printMode && (
          <>
            <div className="editor-section">
              <h2 className="section-title">Cover Letter Editor</h2>
              
              <div>
                <label className="field-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={companyName}
                  placeholder="Enter company name"
                  readOnly
                  style={{ marginBottom: '16px' }}
                />
              </div>

              <div>
                <label className="field-label">Salutation</label>
                <input
                  type="text"
                  className="form-control"
                  value={coverLetterData.salutation}
                  onChange={(e) => handleFieldUpdate('salutation', e.target.value)}
                  placeholder="Dear Hiring Manager"
                  style={{ marginBottom: '16px' }}
                />
              </div>

              <div>
                <label className="field-label">Opening Paragraph</label>
                <AITextInput
                  className="text-input"
                  value={coverLetterData.opening}
                  onChange={(e) => handleFieldUpdate('opening', e.target.value)}
                  placeholder="I am writing to express my strong interest in the [Position] role at [Company]. With my background in [relevant experience], I am confident I would be a valuable addition to your team."
                  fieldType="coverLetter"
                  fieldName="Opening Paragraph"
                  context={aiContext}
                  userSubscription={userSubscription}
                  remainingCredits={remainingCredits}
                  onUpgrade={onUpgrade}
                  onCreditUsed={onCreditUsed}
                  onVersionTrack={onVersionTrack}
                  rows={4}
                />
              </div>

              <div>
                <label className="field-label">Body Paragraph 1 - Why You&apos;re Qualified</label>
                <AITextInput
                  className="text-input"
                  value={coverLetterData.body1}
                  onChange={(e) => handleFieldUpdate('body1', e.target.value)}
                  placeholder="In my current role as [Current Position] at [Current Company], I have [key achievements]. These experiences have prepared me well for the challenges of the [Target Position] role."
                  fieldType="coverLetter"
                  fieldName="Qualifications Paragraph"
                  context={aiContext}
                  userSubscription={userSubscription}
                  remainingCredits={remainingCredits}
                  onUpgrade={onUpgrade}
                  onCreditUsed={onCreditUsed}
                  onVersionTrack={onVersionTrack}
                  rows={5}
                />
              </div>

              <div>
                <label className="field-label">Body Paragraph 2 - Why This Company</label>
                <AITextInput
                  className="text-input"
                  value={coverLetterData.body2}
                  onChange={(e) => handleFieldUpdate('body2', e.target.value)}
                  placeholder="I am particularly drawn to [Company] because [specific reasons]. Your commitment to [company values/mission] aligns perfectly with my professional goals and values."
                  fieldType="coverLetter"
                  fieldName="Company Fit Paragraph"
                  context={aiContext}
                  userSubscription={userSubscription}
                  remainingCredits={remainingCredits}
                  onUpgrade={onUpgrade}
                  onCreditUsed={onCreditUsed}
                  onVersionTrack={onVersionTrack}
                  rows={5}
                />
              </div>

              <div>
                <label className="field-label">Body Paragraph 3 - Value You&apos;ll Bring (Optional)</label>
                <AITextInput
                  className="text-input"
                  value={coverLetterData.body3}
                  onChange={(e) => handleFieldUpdate('body3', e.target.value)}
                  placeholder="I am confident that my skills in [specific skills] would enable me to [specific contributions]. I am excited about the opportunity to [specific goals for the role]."
                  fieldType="coverLetter"
                  fieldName="Value Proposition Paragraph"
                  context={aiContext}
                  userSubscription={userSubscription}
                  remainingCredits={remainingCredits}
                  onUpgrade={onUpgrade}
                  onCreditUsed={onCreditUsed}
                  onVersionTrack={onVersionTrack}
                  rows={5}
                />
              </div>

              <div>
                <label className="field-label">Closing Paragraph</label>
                <AITextInput
                  className="text-input"
                  value={coverLetterData.closing}
                  onChange={(e) => handleFieldUpdate('closing', e.target.value)}
                  placeholder="Thank you for considering my application. I would welcome the opportunity to discuss how my experience and passion would contribute to [Company]'s continued success. I am available for an interview at your convenience."
                  fieldType="coverLetter"
                  fieldName="Closing Paragraph"
                  context={aiContext}
                  userSubscription={userSubscription}
                  remainingCredits={remainingCredits}
                  onUpgrade={onUpgrade}
                  onCreditUsed={onCreditUsed}
                  onVersionTrack={onVersionTrack}
                  rows={4}
                />
              </div>

              <div>
                <label className="field-label">Sign-off</label>
                <input
                  type="text"
                  className="form-control"
                  value={coverLetterData.signOff}
                  onChange={(e) => handleFieldUpdate('signOff', e.target.value)}
                  placeholder="Sincerely"
                />
              </div>
            </div>

            {/* Signature Selector */}
            <SignatureSelector
              selectedFont={signatureFont}
              onFontChange={setSignatureFont}
              userName={resumeData.basics.name}
              userSubscription={userSubscription}
              onUpgrade={onUpgrade}
              customFont={customSignatureFont}
              onCustomFontChange={setCustomSignatureFont}
            />

            <div className="controls">
              <button className="btn btn-primary" onClick={() => exportCoverLetter('text')}>
                Export as Text
              </button>
              <button className="btn btn-secondary" onClick={() => exportCoverLetter('pdf')}>
                Export as PDF
              </button>
            </div>
          </>
        )}

        <div className="preview-mode">
          <h3 className="section-title">Preview</h3>
          <div className="preview-letter">
            <div className="cover-letter-header">
              <div className="sender-info">
                <div className="sender-name">{resumeData.basics.name}</div>
                <div className="sender-contact">
                  {resumeData.basics.email}<br />
                  {resumeData.basics.phone}<br />
                  {resumeData.basics.location}
                </div>
              </div>

              <div className="date">{new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>

              {companyName && (
                <div className="recipient-info">
                  <div className="company-name">{companyName}</div>
                  {hiringManagerName && (
                    <div className="hiring-manager">{hiringManagerName}</div>
                  )}
                </div>
              )}
            </div>

            <div className="letter-body">
              <div style={{ whiteSpace: 'pre-wrap' }}>{generateFullLetter()}</div>
              
              {/* Signature and Name */}
              <div className="signature-section" style={{ marginTop: '8px' }}>
                <style jsx={true}>{`
                  ${signatureFont === 'custom' && customSignatureFont ? 
                    `@import url('https://fonts.googleapis.com/css2?family=${customSignatureFont.replace(/\s+/g, '+')}:wght@400;700&display=swap');` :
                    `@import url('${SIGNATURE_FONTS.find(f => f.id === signatureFont)?.url || ''}');`
                  }
                  .signature {
                    font-family: ${
                      signatureFont === 'custom' && customSignatureFont ? 
                        (customSignatureFont.includes(' ') ? `"${customSignatureFont}", cursive` : `${customSignatureFont}, cursive`) :
                        (SIGNATURE_FONTS.find(f => f.id === signatureFont)?.font || 'inherit')
                    };
                    font-size: 36px;
                    color: #1a1a1a;
                    margin: 16px 0 8px 0;
                    letter-spacing: 0.03em;
                  }
                  .typed-name {
                    font-size: inherit;
                    color: ${resumeDesignSystem.typography.bodyText.color};
                    font-family: ${useSerifFont ? resumeDesignSystem.layout.serifFontFamily : resumeDesignSystem.layout.fontFamily};
                    line-height: 1.6;
                  }
                `}</style>
                {signatureFont !== 'none' && (
                  <div className="signature">{resumeData.basics.name}</div>
                )}
                <div className="typed-name">{resumeData.basics.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CoverLetter.propTypes = {
  resumeData: PropTypes.object.isRequired,
  jobDescription: PropTypes.string,
  companyName: PropTypes.string,
  hiringManagerName: PropTypes.string,
  recipientName: PropTypes.string,
  onUpdate: PropTypes.func,
  userSubscription: PropTypes.string,
  remainingCredits: PropTypes.number,
  onUpgrade: PropTypes.func,
  onCreditUsed: PropTypes.func,
  onVersionTrack: PropTypes.func,
  printMode: PropTypes.bool,
  useSerifFont: PropTypes.bool,
  initialContent: PropTypes.shape({
    salutation: PropTypes.string,
    opening: PropTypes.string,
    body1: PropTypes.string,
    body2: PropTypes.string,
    body3: PropTypes.string,
    closing: PropTypes.string,
    signOff: PropTypes.string
  })
};

export default CoverLetter;