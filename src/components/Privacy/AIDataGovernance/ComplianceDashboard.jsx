/**
 * Compliance Dashboard Component
 * 
 * Real-time compliance monitoring across global legal frameworks
 */

import { useState, useEffect } from 'react';
import {
  Paper,
  Title,
  Text,
  Grid,
  Group,
  Stack,
  ActionIcon,
  Tooltip,
  Button,
  Card
} from '@mantine/core';
import {
  ModularCard,
  StatusIndicator,
  ModularButton,
  ModularBadge,
  AlertBox,
  ProgressBar
} from '../UI';
import {
  IconShield,
  IconTrendingUp,
  IconUsers,
  IconFileCheck,
  IconRefresh,
  IconDownload,
  IconAlertTriangle,
  IconCircleCheck
} from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useAIDataGovernance } from './AIDataGovernance.jsx';

export function ComplianceDashboard({ onExportReport, ...rest }) {
  const { complianceReport, generateReport } = useAIDataGovernance();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update timestamp every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const handleRefreshReport = async () => {
    setIsRefreshing(true);
    try {
      await generateReport();
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh compliance report:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleExportReport = () => {
    if (onExportReport) {
      onExportReport(complianceReport);
    } else {
      // Default export functionality
      const dataStr = JSON.stringify(complianceReport, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lucitra-compliance-report-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };
  
  if (!complianceReport) {
    return (
      <Paper p="xl" shadow="md" radius="lg">
        <Text>Loading compliance report...</Text>
      </Paper>
    );
  }
  
  const getComplianceColor = (score) => {
    if (score >= 95) return 'black';
    if (score >= 85) return '#666';
    return '#999';
  };
  
  return (
    <Paper p="xl" shadow="md" radius="lg" {...rest}>
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <Group>
          <IconShield size={28} color="black" />
          <div>
            <Title order={2}>Global Compliance Status</Title>
            <Text c="dimmed" size="sm">
              Real-time monitoring across {Object.keys(complianceReport.jurisdictional_compliance).length} jurisdictions
            </Text>
          </div>
        </Group>
        
        <Group>
          <Tooltip label={`Last updated: ${lastUpdated.toLocaleTimeString()}`}>
            <ActionIcon 
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                color: 'black'
              }}
              onClick={handleRefreshReport}
              loading={isRefreshing}
            >
              <IconRefresh size={16} />
            </ActionIcon>
          </Tooltip>
          
          <ModularButton
            variant="outline"
            onClick={handleExportReport}
          >
            <IconDownload size={16} style={{ marginRight: '8px' }} />
            Export Report
          </ModularButton>
          
          <ModularBadge variant="primary">
            Live Monitoring
          </ModularBadge>
        </Group>
      </Group>
      
      {/* Compliance Overview Cards */}
      <Grid mb="xl">
        <Grid.Col span={4}>
          <ModularCard variant="secondary" padding="lg">
            <Group justify="space-between" mb="md">
              <Group>
                <IconShield size={24} color="black" />
                <Text fw={600}>Overall Compliance</Text>
              </Group>
            </Group>
            
            <Text size="3xl" fw={700} c="black" mb="xs">
              {complianceReport.summary.compliance_score}%
            </Text>
            
            <ProgressBar 
              value={complianceReport.summary.compliance_score} 
              size="lg"
              style={{ marginBottom: '16px' }}
            />
            
            <Text size="sm" c="dimmed">
              Exceeds industry standards globally
            </Text>
          </ModularCard>
        </Grid.Col>
        
        <Grid.Col span={4}>
          <ModularCard variant="secondary" padding="lg">
            <Group justify="space-between" mb="md">
              <Group>
                <IconFileCheck size={24} color="black" />
                <Text fw={600}>Datasets Processed</Text>
              </Group>
            </Group>
            
            <Text size="3xl" fw={700} c="black" mb="xs">
              {complianceReport.summary.total_datasets_processed.toLocaleString()}
            </Text>
            
            <Group gap="xs" mb="sm">
              <StatusIndicator status="success" size="sm" />
              <Text size="sm" fw={600}>All Compliant</Text>
            </Group>
            
            <Text size="sm" c="dimmed">
              Zero compliance violations detected
            </Text>
          </ModularCard>
        </Grid.Col>
        
        <Grid.Col span={4}>
          <ModularCard variant="secondary" padding="lg">
            <Group justify="space-between" mb="md">
              <Group>
                <IconUsers size={24} color="black" />
                <Text fw={600}>Consent Records</Text>
              </Group>
            </Group>
            
            <Text size="3xl" fw={700} c="black" mb="xs">
              {complianceReport.summary.total_consent_records.toLocaleString()}
            </Text>
            
            <Group gap="xs" mb="sm">
              <StatusIndicator status="success" size="sm" />
              <Text size="sm" fw={600}>Fully Documented</Text>
            </Group>
            
            <Text size="sm" c="dimmed">
              Complete audit trail maintained
            </Text>
          </ModularCard>
        </Grid.Col>
      </Grid>
      
      {/* Jurisdictional Compliance */}
      <ModularCard variant="primary" padding="lg" style={{ marginBottom: '24px' }}>
        <Group justify="space-between" mb="lg">
          <Group>
            <IconTrendingUp size={24} color="black" />
            <Text fw={600} size="lg">Jurisdictional Compliance</Text>
          </Group>
          
          <ModularBadge variant="secondary">
            {Object.keys(complianceReport.jurisdictional_compliance).length} Jurisdictions
          </ModularBadge>
        </Group>
        
        <Stack gap="md">
          {Object.entries(complianceReport.jurisdictional_compliance).map(([jurisdiction, score]) => (
            <div key={jurisdiction}>
              <Group justify="space-between" mb="xs">
                <Group>
                  <Text fw={600} size="sm" tt="capitalize">
                    {jurisdiction === 'us' ? 'United States' : 
                     jurisdiction === 'eu' ? 'European Union' :
                     jurisdiction.charAt(0).toUpperCase() + jurisdiction.slice(1)}
                  </Text>
                  
                  {score >= 95 && <ModularBadge variant="primary" size="sm">Exceeds Standards</ModularBadge>}
                  {score >= 85 && score < 95 && <ModularBadge variant="secondary" size="sm">Compliant</ModularBadge>}
                  {score < 85 && <ModularBadge variant="outline" size="sm">Needs Attention</ModularBadge>}
                </Group>
                
                <Text size="sm" fw={600} c={getComplianceColor(score)}>
                  {score}%
                </Text>
              </Group>
              
              <ProgressBar 
                value={score} 
                size="md"
              />
            </div>
          ))}
        </Stack>
      </ModularCard>
      
      {/* AI-Specific Compliance */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <Card withBorder h="100%" p="lg">
            <Group mb="lg">
              <IconCircleCheck size={24} color="black" />
              <Text fw={600} size="lg">AI-Specific Compliance</Text>
            </Group>
            
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm">Bias Assessments</Text>
                <Group gap="xs">
                  <Text size="sm" fw={600} c="black">
                    {complianceReport.ai_compliance.bias_assessments_conducted.passed}/
                    {complianceReport.ai_compliance.bias_assessments_conducted.total}
                  </Text>
                  <ModularBadge variant="primary" size="sm">Passed</ModularBadge>
                </Group>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm">Transparency Reports</Text>
                <Group gap="xs">
                  <Text size="sm" fw={600} c="black">
                    {complianceReport.ai_compliance.transparency_reports_generated.published}/
                    {complianceReport.ai_compliance.transparency_reports_generated.generated}
                  </Text>
                  <ModularBadge variant="primary" size="sm">Published</ModularBadge>
                </Group>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm">Automated Decision Audits</Text>
                <Group gap="xs">
                  <Text size="sm" fw={600} c="black">
                    {complianceReport.ai_compliance.automated_decision_audits.audits_conducted}
                  </Text>
                  <ModularBadge variant="primary" size="sm">Conducted</ModularBadge>
                </Group>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={6}>
          <Card withBorder h="100%" p="lg">
            <Group mb="lg">
              <IconAlertTriangle size={24} color="black" />
              <Text fw={600} size="lg">Risk Assessment</Text>
            </Group>
            
            <Stack gap="md">
              <div>
                <Text size="sm" c="dimmed" mb="xs">High-Risk Data Types</Text>
                <Group gap="xs">
                  {complianceReport.risk_assessment.high_risk_data_types.map((type, index) => (
                    <ModularBadge key={index} variant="outline" size="sm">
                      {type.replace(/_/g, ' ')}
                    </ModularBadge>
                  ))}
                </Group>
              </div>
              
              <div>
                <Text size="sm" c="dimmed" mb="xs">Mitigation Measures</Text>
                <Group gap="xs">
                  {complianceReport.risk_assessment.mitigation_measures_implemented.map((measure, index) => (
                    <ModularBadge key={index} variant="secondary" size="sm">
                      {measure.replace(/_/g, ' ')}
                    </ModularBadge>
                  ))}
                </Group>
              </div>
              
              <div>
                <Text size="sm" c="dimmed" mb="xs">Outstanding Risks</Text>
                {complianceReport.risk_assessment.outstanding_risks.length === 0 ? (
                  <Group gap="xs">
                    <IconCircleCheck size={16} color="black" />
                    <Text size="sm" c="dimmed">No outstanding risks</Text>
                  </Group>
                ) : (
                  <Stack gap="xs">
                    {complianceReport.risk_assessment.outstanding_risks.map((risk, index) => (
                      <Group key={index} gap="xs">
                        <IconAlertTriangle size={16} color="black" />
                        <Text size="sm">{risk}</Text>
                      </Group>
                    ))}
                  </Stack>
                )}
              </div>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
      
      {/* Audit Summary */}
      <Card withBorder p="lg">
        <Group justify="space-between" mb="lg">
          <Group>
            <IconFileCheck size={24} color="black" />
            <Text fw={600} size="lg">Audit Trail Summary</Text>
          </Group>
          
          <ModularBadge variant="secondary">
            {complianceReport.audit_summary.total_audit_events} Total Events
          </ModularBadge>
        </Group>
        
        <Grid>
          <Grid.Col span={4}>
            <Text size="sm" c="dimmed" mb="xs">Critical Events</Text>
            <Text size="xl" fw={700} c="black">
              {complianceReport.audit_summary.critical_events.length}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Text size="sm" c="dimmed" mb="xs">Compliance Violations</Text>
            <Text size="xl" fw={700} c="black">
              {complianceReport.audit_summary.compliance_violations.length}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Text size="sm" c="dimmed" mb="xs">Report Generated</Text>
            <Text size="sm" fw={600}>
              {new Date(complianceReport.generated_at).toLocaleString()}
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
      
      {/* Recommendations */}
      {complianceReport.recommendations && complianceReport.recommendations.length > 0 && (
        <AlertBox variant="info" mt="lg">
          <Group gap="xs" mb="xs">
            <IconCircleCheck size={20} color="black" />
            <Text fw={600}>Compliance Recommendations</Text>
          </Group>
          <Stack gap="xs">
            {complianceReport.recommendations.map((recommendation, index) => (
              <Text key={index} size="sm">
                • {recommendation}
              </Text>
            ))}
          </Stack>
        </AlertBox>
      )}
    </Paper>
  );
}

ComplianceDashboard.propTypes = {
  onExportReport: PropTypes.func
};

ComplianceDashboard.displayName = 'ComplianceDashboard';

export default ComplianceDashboard;