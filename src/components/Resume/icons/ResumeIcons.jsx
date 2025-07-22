import React from 'react';
import PropTypes from 'prop-types';

/**
 * Modular Icon System for Resume Components
 * 
 * Clean, professional icons using white/grey/black approach
 * No emojis - SVG icons for consistency across platforms
 */

const IconBase = ({ children, size = 16, color = '#666', className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

// AI and Optimization Icons
export const AIIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </IconBase>
);

export const OptimizeIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
  </IconBase>
);

export const BulletPointIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <circle cx="9" cy="12" r="1"/>
    <line x1="13" y1="12" x2="21" y2="12"/>
    <circle cx="9" cy="7" r="1"/>
    <line x1="13" y1="7" x2="21" y2="7"/>
    <circle cx="9" cy="17" r="1"/>
    <line x1="13" y1="17" x2="21" y2="17"/>
  </IconBase>
);

export const JobTitleIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </IconBase>
);

// Version Control Icons
export const VersionIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </IconBase>
);

export const UndoIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <path d="M3 7v6h6"/>
    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
  </IconBase>
);

export const RedoIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <path d="M21 7v6h-6"/>
    <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3-2.3"/>
  </IconBase>
);

export const HistoryIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 8,14"/>
  </IconBase>
);

export const ViewIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </IconBase>
);

export const RevertIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <path d="M3 7v6h6"/>
    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
  </IconBase>
);

// Change Type Icons
export const AddedIcon = ({ size, color = '#28a745', ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </IconBase>
);

export const ModifiedIcon = ({ size, color = '#ffc107', ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12l2 2 4-4"/>
  </IconBase>
);

export const RemovedIcon = ({ size, color = '#dc3545', ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </IconBase>
);

// Edit Actions
export const EditIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </IconBase>
);

export const DeleteIcon = ({ size, color = '#dc3545', ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <polyline points="3,6 5,6 21,6"/>
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </IconBase>
);

export const SaveIcon = ({ size, color = '#28a745', ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
    <polyline points="17,21 17,13 7,13 7,21"/>
    <polyline points="7,3 7,8 15,8"/>
  </IconBase>
);

export const CancelIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </IconBase>
);

export const CloseIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </IconBase>
);

// Expand/Collapse
export const ChevronRightIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <polyline points="9,18 15,12 9,6"/>
  </IconBase>
);

// Status and Information
export const InfoIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </IconBase>
);

export const CheckIcon = ({ size, color = '#28a745', ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <polyline points="20,6 9,17 4,12"/>
  </IconBase>
);

// Document Icons
export const DocumentIcon = ({ size, color, ...props }) => (
  <IconBase size={size} color={color} {...props}>
    <path d="M14,2H6a2,2 0,0,0 -2,2V20a2,2 0,0,0 2,2H18a2,2 0,0,0 2,-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </IconBase>
);

// Default export with all icons
const ResumeIcons = {
  AI: AIIcon,
  Optimize: OptimizeIcon,
  BulletPoint: BulletPointIcon,
  JobTitle: JobTitleIcon,
  Version: VersionIcon,
  Undo: UndoIcon,
  Redo: RedoIcon,
  History: HistoryIcon,
  View: ViewIcon,
  Revert: RevertIcon,
  Added: AddedIcon,
  Modified: ModifiedIcon,
  Removed: RemovedIcon,
  Edit: EditIcon,
  Delete: DeleteIcon,
  Save: SaveIcon,
  Cancel: CancelIcon,
  Close: CloseIcon,
  ChevronRight: ChevronRightIcon,
  Info: InfoIcon,
  Check: CheckIcon,
  Document: DocumentIcon
};

IconBase.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string
};

// PropTypes for all icon components
AIIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

OptimizeIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

BulletPointIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

JobTitleIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

VersionIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

UndoIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

RedoIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

HistoryIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

ViewIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

RevertIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

AddedIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

ModifiedIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

RemovedIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

EditIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

DeleteIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

SaveIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

CancelIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

CloseIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

ChevronRightIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

InfoIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

CheckIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

DocumentIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

export default ResumeIcons;