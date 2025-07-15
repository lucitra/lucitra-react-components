/**
 * Data Classification Dashboard Component
 * 
 * Interactive dashboard for classifying AI training data according to legal requirements
 */

import { useState } from 'react';
import {
  Paper,
  Title,
  Button,
  Group,
  Stack,
  Badge,
  Text,
  Card,
  Grid,
  Alert,
  Progress,
  Code
} from '@mantine/core';
import {
  IconDatabase,
  IconShield,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle
} from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useAIDataGovernance } from './AIDataGovernance.jsx';

export function DataClassificationDashboard({ onClassificationComplete, ...rest }) {
  const { governance } = useAIDataGovernance();
  const [classificationResults, setClassificationResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClassifyData = async () => {
    setIsLoading(true);
    
    const mockDataSource = {
      type: 'user_generated_3d_scenes',
      volume: '10000_records',
      contains_personal_data: true,
      geographic_origin: ['us', 'eu', 'canada'],
      data_types: ['user_interactions', 'scene_metadata', 'performance_metrics'],
      processing_purpose: 'ai_model_training'
    };
    
    try {
      const results = await governance.classifyTrainingData(mockDataSource);
      setClassificationResults(results);
      
      if (onClassificationComplete) {
        onClassificationComplete(results);
      }
    } catch (error) {
      console.error('Classification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getRiskBadgeColor = (level) => {
    switch (level) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };
  
  const getDataTypeBadgeColor = (type) => {
    const sensitiveTypes = ['sensitive_personal_data', 'childrens_data', 'protected_health_information', 'biometric_data'];
    return sensitiveTypes.includes(type) ? 'red' : 'blue';
  };
  
  return (
    <Paper p="xl" shadow="md" radius="lg" {...rest}>
      <Group justify="space-between" mb="xl">
        <Group>
          <IconDatabase size={28} color="blue" />
          <div>
            <Title order={2}>AI Training Data Classification</Title>
            <Text c="dimmed" size="sm">
              Automated legal compliance assessment for training datasets
            </Text>
          </div>
        </Group>
        
        <Button 
          onClick={handleClassifyData}
          loading={isLoading}
          leftSection={<IconShield size={16} />}
        >
          Classify Sample Dataset
        </Button>
      </Group>
      
      {!classificationResults && (
        <Alert icon={<IconInfoCircle />} color="blue">
          <Text fw={600} mb="xs">Ready for Data Classification</Text>
          <Text size="sm">
            Click "Classify Sample Dataset" to analyze a mock 3D scene dataset according to global legal standards 
            including GDPR, CCPA, EU AI Act, and healthcare regulations.
          </Text>
        </Alert>
      )}
      
      {classificationResults && (
        <Stack gap="lg">
          {/* Classification Overview */}
          <Card withBorder p="md">
            <Group justify="space-between" mb="md">
              <Text fw={600} size="lg">Classification Results</Text>
              <Badge color="green" leftSection={<IconCircleCheck size={14} />}>
                Classification Complete
              </Badge>
            </Group>
            
            <Grid>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Dataset ID</Text>
                <Code>{classificationResults.id}</Code>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Classification Time</Text>
                <Text size="sm">{new Date(classificationResults.timestamp).toLocaleString()}</Text>
              </Grid.Col>
            </Grid>
          </Card>
          
          {/* Data Types Detected */}
          <Card withBorder p="md">
            <Group mb="md">
              <IconAlertTriangle size={20} color="orange" />
              <Text fw={600}>Data Types Detected</Text>
            </Group>
            
            <Group gap="xs" mb="md">
              {classificationResults.dataTypes.map((type, index) => (
                <Badge 
                  key={index} 
                  color={getDataTypeBadgeColor(type)}
                  variant="light"
                >
                  {type.replace(/_/g, ' ').toUpperCase()}
                </Badge>
              ))}
            </Group>
            
            <Text size="sm" c="dimmed">
              Detected data types determine processing requirements and legal compliance obligations.
            </Text>
          </Card>
          
          {/* Jurisdictional Requirements */}
          <Card withBorder p="md">
            <Group mb="md">
              <IconShield size={20} color="blue" />
              <Text fw={600}>Jurisdictional Requirements</Text>
            </Group>
            
            <Group gap="xs" mb="md">
              {classificationResults.jurisdictions.map((jurisdiction, index) => (
                <Badge 
                  key={index} 
                  color="blue"
                  variant="outline"
                >
                  {jurisdiction.toUpperCase()}
                </Badge>
              ))}
            </Group>
            
            <Text size="sm" c="dimmed">
              Data processing must comply with regulations in all detected jurisdictions.
            </Text>
          </Card>
          
          {/* Risk Assessment */}
          <Card withBorder p="md">
            <Group justify="space-between" mb="md">
              <Group>
                <IconAlertTriangle size={20} color={getRiskBadgeColor(classificationResults.riskLevel?.level)} />
                <Text fw={600}>Risk Assessment</Text>
              </Group>
              
              <Badge 
                size="lg"
                color={getRiskBadgeColor(classificationResults.riskLevel?.level)}
              >
                {classificationResults.riskLevel?.level?.toUpperCase()} RISK
              </Badge>
            </Group>
            
            <Progress 
              value={classificationResults.riskLevel?.score || 0} 
              color={getRiskBadgeColor(classificationResults.riskLevel?.level)}
              size="lg"
              mb="md"
            />
            
            <Group justify="space-between" mb="md">
              <Text size="sm" c="dimmed">Risk Score</Text>
              <Text size="sm" fw={600}>
                {classificationResults.riskLevel?.score || 0}/100
              </Text>
            </Group>
            
            {classificationResults.riskLevel?.factors && (
              <div>
                <Text fw={600} size="sm" mb="xs">Risk Factors:</Text>
                <Stack gap="xs">
                  {classificationResults.riskLevel.factors.map((factor, index) => (
                    <Group key={index} gap="xs">
                      <IconAlertTriangle size={14} color="orange" />
                      <Text size="sm">{factor.replace(/_/g, ' ')}</Text>
                    </Group>
                  ))}
                </Stack>
              </div>
            )}
          </Card>
          
          {/* Legal Basis Requirements */}
          <Card withBorder p="md">
            <Group mb="md">
              <IconShield size={20} color="green" />
              <Text fw={600}>Legal Processing Requirements</Text>
            </Group>
            
            <Stack gap="md">
              {Object.entries(classificationResults.legalBases || {}).map(([jurisdiction, basis]) => (
                <div key={jurisdiction}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm" tt="uppercase">{jurisdiction}</Text>
                    <Badge color="green" variant="light">
                      {basis.basis?.replace(/_/g, ' ')}
                    </Badge>
                  </Group>
                  
                  {basis.requirements && (
                    <Stack gap="xs">
                      {basis.requirements.map((req, index) => (
                        <Group key={index} gap="xs">
                          <IconCircleCheck size={14} color="green" />
                          <Text size="xs" c="dimmed">{req.replace(/_/g, ' ')}</Text>
                        </Group>
                      ))}
                    </Stack>
                  )}
                </div>
              ))}
            </Stack>
          </Card>
          
          {/* AI Ethics Review */}
          {classificationResults.aiEthicsReview && (
            <Card withBorder p="md">
              <Group mb="md">
                <IconCircleCheck size={20} color="green" />
                <Text fw={600}>AI Ethics Review</Text>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm">Review Status</Text>
                <Badge color="green">
                  {classificationResults.aiEthicsReview.status?.toUpperCase()}
                </Badge>
              </Group>
              
              {classificationResults.aiEthicsReview.reviewer && (
                <Group justify="space-between" mt="xs">
                  <Text size="sm">Reviewed By</Text>
                  <Text size="sm" c="dimmed">
                    {classificationResults.aiEthicsReview.reviewer.replace(/_/g, ' ')}
                  </Text>
                </Group>
              )}
            </Card>
          )}
          
          {/* Processing Status */}
          <Alert 
            icon={<IconCircleCheck />} 
            color={classificationResults.status === 'pending_legal_review' ? 'yellow' : 'green'}
          >
            <Text fw={600} mb="xs">
              Classification Status: {classificationResults.status?.replace(/_/g, ' ').toUpperCase()}
            </Text>
            <Text size="sm">
              {classificationResults.status === 'pending_legal_review' 
                ? 'Dataset has been classified and is awaiting legal review before processing can begin.'
                : 'Dataset is ready for compliant AI training processing.'
              }
            </Text>
          </Alert>
        </Stack>
      )}
    </Paper>
  );
}

DataClassificationDashboard.propTypes = {
  onClassificationComplete: PropTypes.func
};

DataClassificationDashboard.displayName = 'DataClassificationDashboard';

export default DataClassificationDashboard;