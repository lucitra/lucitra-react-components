import React from 'react'
import { RegionSwitcher } from './RegionSwitcher'

export default {
  title: 'Navigation/RegionSwitcher/Positioning Tests',
  component: RegionSwitcher,
  parameters: {
    layout: 'padded',
  },
}

const regions = [
  { code: 'US', name: 'United States', flag: '🇺🇸', language: 'en' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', language: 'en' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', language: 'en' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', language: 'en' },
  { code: 'FR', name: 'France', flag: '🇫🇷', language: 'fr' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', language: 'de' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', language: 'es' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', language: 'it' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', language: 'ja' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', language: 'ko' },
  { code: 'CN', name: 'China', flag: '🇨🇳', language: 'zh' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', language: 'ar' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', language: 'ar' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', language: 'pt' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', language: 'ru' },
]

// Test component in different screen positions
export const TopLeftCorner = () => (
  <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
    <RegionSwitcher 
      regions={regions} 
      showCurrentSelection={true}
      currentRegion={regions[0]}
    />
  </div>
)

export const TopRightCorner = () => (
  <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
    <RegionSwitcher 
      regions={regions} 
      showCurrentSelection={true}
      currentRegion={regions[0]}
    />
  </div>
)

export const BottomLeftCorner = () => (
  <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
    <RegionSwitcher 
      regions={regions} 
      showCurrentSelection={true}
      currentRegion={regions[0]}
    />
  </div>
)

export const BottomRightCorner = () => (
  <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
    <RegionSwitcher 
      regions={regions} 
      showCurrentSelection={true}
      currentRegion={regions[0]}
    />
  </div>
)

export const CenterScreen = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    width: '100vw'
  }}>
    <RegionSwitcher 
      regions={regions} 
      showCurrentSelection={true}
      currentRegion={regions[0]}
    />
  </div>
)

export const RTLLayout = () => {
  React.useEffect(() => {
    document.documentElement.dir = 'rtl'
    return () => {
      document.documentElement.dir = 'ltr'
    }
  }, [])

  return (
    <div dir="rtl" style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>RTL Layout Test - Should open LEFT</h3>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row-reverse' }}>
        <RegionSwitcher 
          regions={regions} 
          showCurrentSelection={true}
          currentRegion={regions[11]} // UAE (Arabic)
        />
        <RegionSwitcher 
          regions={regions} 
          showCurrentSelection={true}
          currentRegion={regions[12]} // Saudi Arabia (Arabic)
        />
      </div>
    </div>
  )
}

export const LTRvsRTLComparison = () => {
  const [isRTL, setIsRTL] = React.useState(false)
  
  React.useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    return () => {
      document.documentElement.dir = 'ltr'
    }
  }, [isRTL])

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setIsRTL(!isRTL)}
          style={{ 
            padding: '8px 16px', 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px' 
          }}
        >
          Switch to {isRTL ? 'LTR' : 'RTL'} Layout
        </button>
        <p style={{ marginTop: '10px' }}>
          Current: <strong>{isRTL ? 'RTL (should open LEFT)' : 'LTR (should open RIGHT)'}</strong>
        </p>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        justifyContent: 'center',
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <RegionSwitcher 
          regions={regions} 
          showCurrentSelection={true}
          currentRegion={isRTL ? regions[11] : regions[0]}
        />
      </div>
    </div>
  )
}

export const SmallViewport = () => (
  <div style={{ 
    width: '300px', 
    height: '200px', 
    border: '2px solid #ccc',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <RegionSwitcher 
        regions={regions} 
        showCurrentSelection={true}
        currentRegion={regions[0]}
      />
    </div>
    <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
      <RegionSwitcher 
        regions={regions} 
        showCurrentSelection={true}
        currentRegion={regions[0]}
      />
    </div>
  </div>
)