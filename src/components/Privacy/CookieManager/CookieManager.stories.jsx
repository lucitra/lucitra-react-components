/**
 * Cookie Manager - Storybook Stories
 * 
 * Production-ready cookie management with real browser cookies
 */

import { useState, useEffect } from 'react';
import { Stack, Container, Alert, Group, Badge, Text, Button, Code } from '@mantine/core';
import { IconCookieMan, IconShield, IconDatabase, IconCheck } from '@tabler/icons-react';

import CookieConsentBanner from './CookieConsentBanner';
import { useCookieManager } from './CookieManager';

export default {
  title: 'Business Components/Privacy Suite/Cookie Manager',
  component: CookieConsentBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Production Cookie Manager - Minimal Black & White Design

**Simplified cookie management with monochrome design**

## Design Principles
- **Minimal**: Clean, black and white interface
- **Modular**: Gray borders for subsections, black for main sections
- **Engineering Focus**: Unicode symbols with gray backgrounds for technical data
- **No Color Dependency**: Information hierarchy through typography and borders

## Features
- Minimal cookie banner mode for simple consent
- Full dashboard for detailed preferences
- Monochrome design with gray/black borders
- Unicode symbols for technical metrics
- Modular card-based layout
        `
      }
    }
  }
}

// Minimal Cookie Consent
export const MinimalCookieConsent = {
  name: 'Minimal Cookie Consent',
  render: () => {
    return (
      <Container size="xl" py="xl">
        <Alert mb="xl" style={{ backgroundColor: 'white', border: '1px solid black' }}>
          <Text fw={600} c="black">Minimal Cookie Consent Demo</Text>
          <Text size="sm" c="gray.7">
            Simple black and white cookie banner for minimal impact
          </Text>
        </Alert>
        
        <CookieConsentBanner
          minimal={true}
          showBannerOnMount={true}
          autoShow={true}
          onConsentChange={(data) => console.log('Consent changed:', data)}
        />
      </Container>
    );
  }
};

// Live Cookie Demo
export const LiveCookieDemo = {
  name: 'Live Cookie Management',
  render: () => {
    const { 
      cookieManager, 
      consentState, 
      hasConsent, 
      generateComplianceReport 
    } = useCookieManager();
    
    const [allCookies, setAllCookies] = useState({});
    const [complianceReport, setComplianceReport] = useState(null);
    const [consentData, setConsentData] = useState(null);
    
    // Refresh cookie data
    const refreshData = () => {
      setAllCookies(cookieManager.getAllLucitraCookies());
      setComplianceReport(generateComplianceReport());
    };
    
    useEffect(() => {
      refreshData();
      
      // Listen for consent changes
      const handleConsentChange = (event) => {
        refreshData();
      };
      
      window.addEventListener('lucitraConsentChange', handleConsentChange);
      
      return () => {
        window.removeEventListener('lucitraConsentChange', handleConsentChange);
      };
    }, []);
    
    // Demo functions
    const setTestCookie = () => {
      cookieManager.setCookie('lucitra_test_cookie', 'test_value_' + Date.now(), {
        days: 1
      });
      refreshData();
    };
    
    const deleteTestCookie = () => {
      cookieManager.deleteCookie('lucitra_test_cookie');
      refreshData();
    };
    
    return (
      <Container size="xl" py="xl">
        <Alert mb="xl" color="blue" icon={<IconCookieMan />}>
          <Group justify="space-between">
            <div>
              <Text fw={600}>Live Cookie Manager Demo</Text>
              <Text size="sm">
                Real browser cookies - check DevTools Application tab to see actual cookies
              </Text>
            </div>
            <Badge color="blue" size="lg">Production Ready</Badge>
          </Group>
        </Alert>
        
        <Stack gap="xl">
          {/* Cookie Consent Interface */}
          <CookieConsentBanner
            showBannerOnMount={false}
            onConsentChange={setConsentData}
            customBranding={{
              title: 'Lucitra Cookie Preferences',
              subtitle: 'Manage your privacy settings',
              primaryColor: '#7c3aed'
            }}
          />
          
          {/* Live Cookie Data */}
          <Alert color="green" icon={<IconDatabase />}>
            <Group justify="space-between" mb="md">
              <Text fw={600}>Current Cookies in Browser</Text>
              <Group gap="sm">
                <Button size="xs" onClick={setTestCookie}>Set Test Cookie</Button>
                <Button size="xs" onClick={deleteTestCookie} color="red">Delete Test</Button>
                <Button size="xs" onClick={refreshData}>Refresh</Button>
              </Group>
            </Group>
            
            {Object.keys(allCookies).length > 0 ? (
              <Code block style={{ fontSize: '11px', maxHeight: '200px', overflow: 'auto' }}>
                {JSON.stringify(allCookies, null, 2)}
              </Code>
            ) : (
              <Text size="sm" c="dimmed">No Lucitra cookies found</Text>
            )}
          </Alert>
          
          {/* Consent Status */}
          {consentData && (
            <Alert color="green" icon={<IconCheck />}>
              <Text fw={600} mb="xs">Consent Updated</Text>
              <Text size="sm">
                Categories: {Object.values(consentData.preferences).filter(Boolean).length}/4 enabled | 
                Source: {consentData.source} |
                Time: {new Date(consentData.timestamp).toLocaleTimeString()}
              </Text>
            </Alert>
          )}
          
          {/* Compliance Report */}
          {complianceReport && (
            <Alert color="purple" icon={<IconShield />}>
              <Text fw={600} mb="xs">Compliance Status</Text>
              <Text size="sm">
                Cookies Enabled: {complianceReport.cookiesEnabled ? 'Yes' : 'No'} |
                Total Cookies: {complianceReport.totalCookies} |
                Audit Events: {complianceReport.auditEvents} |
                Cross-Domain: {complianceReport.crossDomainEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </Alert>
          )}
        </Stack>
      </Container>
    );
  }
}

// Cross-Domain Demo
export const CrossDomainDemo = {
  name: 'Cross-Domain Cookie Sharing',
  render: () => {
    const { cookieManager } = useCookieManager();
    const [syncStatus, setSyncStatus] = useState('Ready');
    
    const testCrossDomainSync = () => {
      setSyncStatus('Syncing...');
      
      // Simulate cross-domain sync
      cookieManager.syncAcrossDomains();
      
      setTimeout(() => {
        setSyncStatus('Synced');
        setTimeout(() => setSyncStatus('Ready'), 2000);
      }, 1000);
    };
    
    return (
      <Container size="xl" py="xl">
        <Alert mb="xl" color="teal" icon={<IconShield />}>
          <Text fw={600}>Cross-Domain Cookie Sharing</Text>
          <Text size="sm">
            Demonstrates consent synchronization across *.lucitra.ai subdomains
          </Text>
        </Alert>
        
        <Stack gap="lg">
          <Text>
            This demo shows how consent preferences can be shared across multiple Lucitra subdomains:
          </Text>
          
          <ul>
            <li>app.lucitra.ai (main 3D platform)</li>
            <li>docs.lucitra.ai (documentation)</li>
            <li>blog.lucitra.ai (marketing site)</li>
            <li>marketplace.lucitra.ai (asset store)</li>
          </ul>
          
          <Group>
            <Button 
              onClick={testCrossDomainSync}
              loading={syncStatus === 'Syncing...'}
              color={syncStatus === 'Synced' ? 'green' : 'blue'}
            >
              {syncStatus === 'Synced' ? 'Synced!' : 'Test Cross-Domain Sync'}
            </Button>
          </Group>
          
          <Alert color="blue">
            <Text fw={600} mb="xs">How it works:</Text>
            <Text size="sm">
              1. Consent is stored with domain=.lucitra.ai<br/>
              2. All subdomains can read the consent cookie<br/>
              3. Changes sync automatically across tabs/domains<br/>
              4. Users only need to consent once across all properties
            </Text>
          </Alert>
          
          <CookieConsentBanner
            showBannerOnMount={false}
            customBranding={{
              title: 'Cross-Domain Consent Demo',
              subtitle: 'Works across all Lucitra properties'
            }}
          />
        </Stack>
      </Container>
    );
  }
}

// Compliance Features Demo
export const ComplianceDemo = {
  name: 'GDPR Compliance Features',
  render: () => {
    const { 
      cookieManager, 
      clearAllCookies, 
      exportUserData, 
      generateComplianceReport 
    } = useCookieManager();
    
    const [exportData, setExportData] = useState(null);
    const [auditTrail, setAuditTrail] = useState([]);
    
    const handleExportData = () => {
      const data = exportUserData();
      setExportData(data);
    };
    
    const handleClearAllData = () => {
      clearAllCookies(false); // Don't keep essential cookies
      setExportData(null);
      setAuditTrail([]);
    };
    
    const showAuditTrail = () => {
      try {
        const audit = JSON.parse(localStorage.getItem('lucitra_cookie_audit') || '[]');
        setAuditTrail(audit.slice(-10)); // Show last 10 events
      } catch {
        setAuditTrail([]);
      }
    };
    
    return (
      <Container size="xl" py="xl">
        <Alert mb="xl" color="green" icon={<IconShield />}>
          <Text fw={600}>GDPR Compliance Features</Text>
          <Text size="sm">
            Right to access, portability, erasure, and audit trails
          </Text>
        </Alert>
        
        <Stack gap="lg">
          <Group gap="sm">
            <Button onClick={handleExportData} leftSection={<IconDatabase size={16} />}>
              Export My Data (GDPR Article 20)
            </Button>
            <Button color="red" onClick={handleClearAllData} leftSection={<IconDatabase size={16} />}>
              Delete All Data (Right to Erasure)
            </Button>
            <Button variant="outline" onClick={showAuditTrail}>
              Show Audit Trail
            </Button>
          </Group>
          
          <CookieConsentBanner
            showBannerOnMount={false}
            customBranding={{
              title: 'GDPR Compliant Cookies',
              subtitle: 'Full data rights and transparency'
            }}
          />
          
          {exportData && (
            <Alert color="blue">
              <Text fw={600} mb="xs">Exported Data (GDPR Article 20)</Text>
              <Code block style={{ fontSize: '10px', maxHeight: '300px', overflow: 'auto' }}>
                {JSON.stringify(exportData, null, 2)}
              </Code>
            </Alert>
          )}
          
          {auditTrail.length > 0 && (
            <Alert color="purple">
              <Text fw={600} mb="xs">Recent Audit Events</Text>
              <Stack gap="xs">
                {auditTrail.map((event, index) => (
                  <Text key={index} size="xs" family="monospace">
                    {new Date(event.timestamp).toLocaleTimeString()}: {event.action}
                  </Text>
                ))}
              </Stack>
            </Alert>
          )}
        </Stack>
      </Container>
    );
  }
}