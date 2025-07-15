/**
 * Enterprise Privacy Manager - Main PET Product Component
 *
 * This is your primary revenue-generating component for enterprise customers.
 * White-label ready with advanced compliance features.
 *
 * Target Price: $50K-500K annual license
 */

import { useState, useEffect } from "react";
import {
  Paper,
  Title,
  Stack,
  Group,
  Button,
  Badge,
  Text,
  Progress,
  Alert,
  Tabs,
  Card,
  Grid,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconShield,
  IconEye,
  IconGraph,
  IconSettings,
  IconAlertTriangle,
  IconCheck,
  IconRefresh,
  IconDownload,
} from "@tabler/icons-react";
import PropTypes from "prop-types";
import {
  PET_TECHNOLOGIES,
  ENTERPRISE_DATA_PURPOSES,
  COMPLIANCE_FRAMEWORKS,
  PRIVACY_METRICS,
} from "../constants/privacyConstants";

/**
 * Enterprise Privacy Manager Component
 *
 * @param {Object} props
 * @param {Object} props.config - Enterprise configuration
 * @param {Function} props.onComplianceChange - Callback for compliance updates
 * @param {Object} props.customBranding - White-label branding options
 * @param {Array} props.enabledTechnologies - PET technologies to enable
 * @param {Object} props.dataProcessingActivities - Current data processing
 * @param {Function} props.onAuditExport - Export audit logs callback
 */
export function EnterprisePrivacyManager({
  config = {},
  onComplianceChange,
  customBranding = {},
  enabledTechnologies = [
    PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY,
    PET_TECHNOLOGIES.FEDERATED_LEARNING,
  ],
  dataProcessingActivities = {},
  onAuditExport,
  ...rest
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [complianceScore, setComplianceScore] = useState(85);
  const [privacyMetrics, setPrivacyMetrics] = useState({
    [PRIVACY_METRICS.EPSILON_CONSUMED]: 0.3,
    [PRIVACY_METRICS.USERS_CONSENTED]: 15420,
    [PRIVACY_METRICS.FEDERATED_PARTICIPANTS]: 8,
    [PRIVACY_METRICS.COMPLIANCE_SCORE]: 85,
  });
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "GDPR consent renewal required for 1,247 users by March 15th",
      severity: "medium",
    },
  ]);

  useEffect(() => {
    // Simulate real-time compliance monitoring
    const interval = setInterval(() => {
      setComplianceScore((prev) => Math.min(100, prev + Math.random() * 2 - 1));

      if (onComplianceChange) {
        onComplianceChange({
          score: complianceScore,
          metrics: privacyMetrics,
          timestamp: new Date().toISOString(),
        });
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [complianceScore, privacyMetrics, onComplianceChange]);

  const renderOverview = () => (
    <Stack gap="lg">
      {/* Compliance Score */}
      <Card 
        style={{ 
          border: '2px solid black', 
          backgroundColor: 'white',
          borderRadius: 0
        }}
      >
        <Group justify="space-between" mb="md">
          <Group>
            <IconShield size={24} color="black" />
            <Title order={3} c="black">Compliance Score</Title>
          </Group>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            color: 'black',
            padding: '8px 12px',
            border: '1px solid gray',
            fontFamily: 'monospace',
            fontSize: '14px',
            fontWeight: 600
          }}>
            {complianceScore.toFixed(1)}%
          </div>
        </Group>
        <div style={{ 
          width: '100%', 
          height: '12px', 
          backgroundColor: '#f8f9fa',
          border: '1px solid gray',
          marginBottom: '8px'
        }}>
          <div style={{ 
            width: `${complianceScore}%`, 
            height: '100%', 
            backgroundColor: 'black'
          }} />
        </div>
        <Text size="sm" c="gray.7">
          Real-time compliance monitoring across{" "}
          {Object.keys(COMPLIANCE_FRAMEWORKS).length} frameworks
        </Text>
      </Card>

      {/* Key Metrics Grid */}
      <Grid>
        <Grid.Col span={6}>
          <Card 
            h="100%" 
            style={{ 
              border: '1px solid gray', 
              backgroundColor: 'white',
              borderRadius: 0
            }}
          >
            <Group justify="space-between" mb="xs">
              <Text fw={600} c="black">Privacy Budget</Text>
              <IconEye size={16} color="black" />
            </Group>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              color: 'black',
              padding: '8px 12px',
              border: '1px solid gray',
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              ε: {(
                (1 - privacyMetrics[PRIVACY_METRICS.EPSILON_CONSUMED]) *
                100
              ).toFixed(1)}%
            </div>
            <Text size="xs" c="gray.7">
              Remaining (ε={privacyMetrics[PRIVACY_METRICS.EPSILON_CONSUMED]})
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card 
            h="100%" 
            style={{ 
              border: '1px solid gray', 
              backgroundColor: 'white',
              borderRadius: 0
            }}
          >
            <Group justify="space-between" mb="xs">
              <Text fw={600} c="black">Active Users</Text>
              <IconGraph size={16} color="black" />
            </Group>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              color: 'black',
              padding: '8px 12px',
              border: '1px solid gray',
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              {privacyMetrics[PRIVACY_METRICS.USERS_CONSENTED].toLocaleString()}
            </div>
            <Text size="xs" c="gray.7">
              With valid consent
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card 
            h="100%" 
            style={{ 
              border: '1px solid gray', 
              backgroundColor: 'white',
              borderRadius: 0
            }}
          >
            <Group justify="space-between" mb="xs">
              <Text fw={600} c="black">Federation Nodes</Text>
              <IconSettings size={16} color="black" />
            </Group>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              color: 'black',
              padding: '8px 12px',
              border: '1px solid gray',
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              {privacyMetrics[PRIVACY_METRICS.FEDERATED_PARTICIPANTS]}
            </div>
            <Text size="xs" c="gray.7">
              Active participants
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card 
            h="100%" 
            style={{ 
              border: '1px solid gray', 
              backgroundColor: 'white',
              borderRadius: 0
            }}
          >
            <Group justify="space-between" mb="xs">
              <Text fw={600} c="black">Data Minimization</Text>
              <IconCheck size={16} color="black" />
            </Group>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              color: 'black',
              padding: '8px 12px',
              border: '1px solid gray',
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              94.2%
            </div>
            <Text size="xs" c="gray.7">
              Efficiency ratio
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Stack gap="sm">
          <Title order={4} c="black">Compliance Alerts</Title>
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              icon={<IconAlertTriangle size={16} color="black" />}
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid gray',
                borderRadius: 0,
                borderLeft: alert.severity === "high" ? '4px solid black' : '4px solid gray'
              }}
            >
              <Text c="black">{alert.message}</Text>
            </Alert>
          ))}
        </Stack>
      )}
    </Stack>
  );

  const renderTechnologies = () => (
    <Stack gap="lg">
      <Title order={4}>Enabled PET Technologies</Title>
      {enabledTechnologies.map((tech) => (
        <Card key={tech} withBorder>
          <Group justify="space-between">
            <div>
              <Text fw={600} mb="xs">
                {tech.replace("_", " ").toUpperCase()}
              </Text>
              <Text size="sm" c="dimmed">
                {getTechnologyDescription(tech)}
              </Text>
            </div>
            <Badge color="green">Active</Badge>
          </Group>
        </Card>
      ))}
    </Stack>
  );

  const renderDataProcessing = () => (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={4}>Data Processing Activities</Title>
        <Button
          variant="outline"
          leftSection={<IconDownload size={16} />}
          onClick={onAuditExport}
        >
          Export ROPA
        </Button>
      </Group>

      {Object.values(ENTERPRISE_DATA_PURPOSES).map((purpose) => (
        <Card key={purpose.id} withBorder>
          <Group justify="space-between" mb="md">
            <Text fw={600}>{purpose.title}</Text>
            <Badge color="blue">{purpose.legal_basis.replace("_", " ")}</Badge>
          </Group>
          <Text size="sm" mb="sm">
            {purpose.description}
          </Text>
          <Group gap="xs" mb="sm">
            {purpose.pet_technologies.map((tech) => (
              <Badge key={tech} variant="light" size="sm">
                {tech.replace("_", " ")}
              </Badge>
            ))}
          </Group>
          <Text size="xs" c="dimmed">
            Retention: {purpose.retention} | Legal basis: {purpose.legal_basis}
          </Text>
        </Card>
      ))}
    </Stack>
  );

  const getTechnologyDescription = (tech) => {
    const descriptions = {
      [PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY]:
        "Mathematical privacy guarantees with configurable epsilon budgets",
      [PET_TECHNOLOGIES.FEDERATED_LEARNING]:
        "Distributed learning without centralized data collection",
      [PET_TECHNOLOGIES.HOMOMORPHIC_ENCRYPTION]:
        "Compute on encrypted data without decryption",
      [PET_TECHNOLOGIES.SECURE_MULTIPARTY_COMPUTATION]:
        "Multi-party computation with privacy preservation",
      [PET_TECHNOLOGIES.CONFIDENTIAL_COMPUTING]:
        "Hardware-based trusted execution environments",
    };
    return descriptions[tech] || "Advanced privacy-preserving technology";
  };

  return (
    <Paper
      p="xl"
      style={{
        minHeight: 600,
        border: '2px solid black',
        borderRadius: 0,
        backgroundColor: 'white'
      }}
      {...rest}
    >
      <Group justify="space-between" mb="xl">
        <Group>
          <IconShield size={32} color="black" />
          <div>
            <Title order={2} c="black">
              {customBranding.title || "Enterprise Privacy Manager"}
            </Title>
            <Text c="gray.7" size="sm">
              {customBranding.subtitle ||
                "Privacy Enhancing Technology Platform"}
            </Text>
          </div>
        </Group>

        <Group>
          <Tooltip label="Refresh compliance data">
            <ActionIcon
              variant="outline"
              onClick={() => window.location.reload()}
              style={{ border: '1px solid gray' }}
            >
              <IconRefresh size={16} color="black" />
            </ActionIcon>
          </Tooltip>
          <div style={{ 
            backgroundColor: 'black', 
            color: 'white',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            LIVE MONITORING
          </div>
        </Group>
      </Group>

      <Tabs 
        value={activeTab} 
        onChange={setActiveTab}
        style={{
          '--tabs-border-color': 'black'
        }}
      >
        <Tabs.List 
          grow
          style={{
            borderBottom: '2px solid black'
          }}
        >
          <Tabs.Tab 
            value="overview" 
            leftSection={<IconGraph size={16} color="black" />}
            style={{
              color: activeTab === 'overview' ? 'black' : 'gray',
              borderBottom: activeTab === 'overview' ? '2px solid black' : 'none'
            }}
          >
            Overview
          </Tabs.Tab>
          <Tabs.Tab
            value="technologies"
            leftSection={<IconSettings size={16} color="black" />}
            style={{
              color: activeTab === 'technologies' ? 'black' : 'gray',
              borderBottom: activeTab === 'technologies' ? '2px solid black' : 'none'
            }}
          >
            PET Technologies
          </Tabs.Tab>
          <Tabs.Tab 
            value="processing" 
            leftSection={<IconEye size={16} color="black" />}
            style={{
              color: activeTab === 'processing' ? 'black' : 'gray',
              borderBottom: activeTab === 'processing' ? '2px solid black' : 'none'
            }}
          >
            Data Processing
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" pt="lg">
          {renderOverview()}
        </Tabs.Panel>

        <Tabs.Panel value="technologies" pt="lg">
          {renderTechnologies()}
        </Tabs.Panel>

        <Tabs.Panel value="processing" pt="lg">
          {renderDataProcessing()}
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}

EnterprisePrivacyManager.propTypes = {
  config: PropTypes.object,
  onComplianceChange: PropTypes.func,
  customBranding: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    primaryColor: PropTypes.string,
    borderColor: PropTypes.string,
  }),
  enabledTechnologies: PropTypes.arrayOf(PropTypes.string),
  dataProcessingActivities: PropTypes.object,
  onAuditExport: PropTypes.func,
};

EnterprisePrivacyManager.displayName = "EnterprisePrivacyManager";

export default EnterprisePrivacyManager;
