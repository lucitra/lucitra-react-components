/**
 * Gaming Privacy Consent - Demo Platform Component
 * 
 * Consumer-friendly privacy controls for gaming platform
 * Showcases PET technology in action for enterprise prospects
 * Serves as training data collection for future robotics models
 */

import { useState, useEffect } from 'react'
import {
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Switch,
  Badge,
  Progress,
  Card,
  Divider,
  Alert,
  Modal,
  Code
} from '@mantine/core'
import {
  IconRobot,
  IconBrain,
  IconEye,
  IconShield,
  IconDeviceGamepad2,
  IconInfoCircle,
  IconChartBar
} from '@tabler/icons-react'
import PropTypes from 'prop-types'
import { GAMING_DATA_PURPOSES, PET_TECHNOLOGIES } from '../constants/privacyConstants'

/**
 * Gaming Privacy Consent Component
 * 
 * @param {Object} props
 * @param {Function} props.onConsentChange - Callback for consent updates
 * @param {Object} props.gameConfig - Game-specific configuration
 * @param {boolean} props.showTechnicalDetails - Show PET implementation details
 * @param {Function} props.onPrivacyBudgetUpdate - Privacy budget callback
 */
export function GamingPrivacyConsent({
  onConsentChange,
  showTechnicalDetails = false,
  onPrivacyBudgetUpdate,
  ...rest
}) {
  const [consents, setConsents] = useState({
    [GAMING_DATA_PURPOSES.GAME_IMPROVEMENT.id]: false,
    [GAMING_DATA_PURPOSES.PERSONALIZATION.id]: false,
    [GAMING_DATA_PURPOSES.COLLABORATIVE_AI.id]: false,
    [GAMING_DATA_PURPOSES.SAFETY_RESEARCH.id]: false
  })
  
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedPurpose, setSelectedPurpose] = useState(null)
  const [privacyBudget, setPrivacyBudget] = useState(100)
  const [estimatedUtility, setEstimatedUtility] = useState(0)

  useEffect(() => {
    // Calculate estimated utility based on consents
    const activeConsents = Object.values(consents).filter(Boolean).length
    const totalPurposes = Object.keys(GAMING_DATA_PURPOSES).length
    const utility = (activeConsents / totalPurposes) * 100
    setEstimatedUtility(utility)

    // Simulate privacy budget consumption
    const budgetConsumption = activeConsents * 10 // Each consent uses 10% budget
    setPrivacyBudget(Math.max(0, 100 - budgetConsumption))

    if (onConsentChange) {
      onConsentChange({
        consents,
        privacyBudget: 100 - budgetConsumption,
        estimatedUtility: utility,
        timestamp: new Date().toISOString()
      })
    }

    if (onPrivacyBudgetUpdate) {
      onPrivacyBudgetUpdate(100 - budgetConsumption)
    }
  }, [consents, onConsentChange, onPrivacyBudgetUpdate])

  const handleConsentToggle = (purposeId) => {
    setConsents(prev => ({
      ...prev,
      [purposeId]: !prev[purposeId]
    }))
  }

  const getPurposeIcon = (purposeId) => {
    const icons = {
      [GAMING_DATA_PURPOSES.GAME_IMPROVEMENT.id]: IconDeviceGamepad2,
      [GAMING_DATA_PURPOSES.PERSONALIZATION.id]: IconBrain,
      [GAMING_DATA_PURPOSES.COLLABORATIVE_AI.id]: IconRobot,
      [GAMING_DATA_PURPOSES.SAFETY_RESEARCH.id]: IconShield
    }
    return icons[purposeId] || IconInfoCircle
  }

  const getTechBadgeColor = (tech) => {
    const colors = {
      [PET_TECHNOLOGIES.DIFFERENTIAL_PRIVACY]: 'blue',
      [PET_TECHNOLOGIES.FEDERATED_LEARNING]: 'green',
      [PET_TECHNOLOGIES.HOMOMORPHIC_ENCRYPTION]: 'purple'
    }
    return colors[tech] || 'gray'
  }

  const renderPurposeCard = (purpose) => {
    const IconComponent = getPurposeIcon(purpose.id)
    const isEnabled = consents[purpose.id]

    return (
      <Card 
        key={purpose.id} 
        p="md"
        style={{ 
          opacity: isEnabled ? 1 : 0.7,
          border: isEnabled ? '2px solid black' : '1px solid gray',
          borderRadius: 0,
          backgroundColor: 'white'
        }}
      >
        <Group justify="space-between" mb="sm">
          <Group>
            <IconComponent size={24} color="black" />
            <div>
              <Text fw={600} size="sm" c="black">{purpose.title}</Text>
              <Text size="xs" c="gray.7">{purpose.user_benefit}</Text>
            </div>
          </Group>
          <Switch
            checked={isEnabled}
            onChange={() => handleConsentToggle(purpose.id)}
            color="dark"
          />
        </Group>

        <Text size="xs" mb="sm" c="gray.7">
          {purpose.description}
        </Text>

        <Group justify="space-between" align="center">
          <Group gap="xs">
            {purpose.pet_technologies.map(tech => (
              <div
                key={tech}
                style={{
                  backgroundColor: '#f8f9fa',
                  color: 'black',
                  padding: '2px 6px',
                  border: '1px solid gray',
                  fontSize: '10px',
                  fontWeight: 600
                }}
              >
                {tech.replace('_', ' ')}
              </div>
            ))}
          </Group>
          
          <Button
            variant="subtle"
            size="xs"
            onClick={() => {
              setSelectedPurpose(purpose)
              setShowDetailsModal(true)
            }}
            style={{ color: 'blue' }}
          >
            Details
          </Button>
        </Group>
      </Card>
    )
  }

  const renderTechnicalDetails = () => (
    <Alert 
      icon={<IconInfoCircle color="black" />} 
      mb="lg"
      style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid gray',
        borderRadius: 0
      }}
    >
      <Text fw={600} mb="xs" c="black">Privacy Technology Showcase</Text>
      <Text size="sm" c="gray.7">
        This gaming platform demonstrates enterprise-grade Privacy Enhancing Technologies:
      </Text>
      <Stack gap="xs" mt="sm">
        <Group>
          <div style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '2px 6px',
            border: '1px solid gray',
            fontSize: '12px',
            fontWeight: 600
          }}>
            Differential Privacy
          </div>
          <Text size="xs" c="gray.7">ε-budget: {((100 - privacyBudget) / 100).toFixed(2)}</Text>
        </Group>
        <Group>
          <div style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '2px 6px',
            border: '1px solid gray',
            fontSize: '12px',
            fontWeight: 600
          }}>
            Federated Learning
          </div>
          <Text size="xs" c="gray.7">Local model updates only</Text>
        </Group>
        <Group>
          <div style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '2px 6px',
            border: '1px solid gray',
            fontSize: '12px',
            fontWeight: 600
          }}>
            Confidential Computing
          </div>
          <Text size="xs" c="gray.7">TEE-protected processing</Text>
        </Group>
      </Stack>
    </Alert>
  )

  return (
    <>
      <Paper 
        p="xl" 
        style={{ 
          border: '2px solid black',
          borderRadius: 0,
          backgroundColor: 'white' 
        }} 
        {...rest}
      >
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2} mb="xs" c="black">
              Privacy-First Gaming
            </Title>
            <Text c="gray.7" size="sm">
              Help improve AI while keeping your data private
            </Text>
          </div>
          <div style={{ 
            backgroundColor: 'black', 
            color: 'white',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            PET TECHNOLOGY DEMO
          </div>
        </Group>

        {showTechnicalDetails && renderTechnicalDetails()}

        {/* Privacy Budget Visualization */}
        <Card 
          mb="lg" 
          p="md"
          style={{ 
            border: '1px solid gray',
            borderRadius: 0,
            backgroundColor: 'white' 
          }}
        >
          <Group justify="space-between" mb="sm">
            <Group>
              <IconEye size={20} color="black" />
              <Text fw={600} c="black">Privacy Budget</Text>
            </Group>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              color: privacyBudget > 50 ? 'green' : (privacyBudget > 25 ? 'orange' : 'red'),
              padding: '4px 8px',
              border: '1px solid gray',
              fontFamily: 'monospace',
              fontSize: '14px',
              fontWeight: 700
            }}>
              {privacyBudget}%
            </div>
          </Group>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: '#f8f9fa',
            border: '1px solid gray',
            marginBottom: '8px'
          }}>
            <div style={{ 
              width: `${privacyBudget}%`, 
              height: '100%', 
              backgroundColor: privacyBudget > 50 ? 'green' : (privacyBudget > 25 ? 'orange' : 'red')
            }} />
          </div>
          <Text size="xs" c="gray.7">
            Remaining privacy protection. Lower values = more utility, less privacy.
          </Text>
        </Card>

        {/* Game Enhancement Options */}
        <Stack gap="sm" mb="lg">
          <Group justify="space-between">
            <Title order={4} c="black">Help Us Improve (Optional)</Title>
            <Group>
              <IconChartBar size={16} color="black" />
              <Text size="sm" c="gray.7">
                Estimated benefit: {estimatedUtility.toFixed(0)}%
              </Text>
            </Group>
          </Group>
          
          {Object.values(GAMING_DATA_PURPOSES).map(renderPurposeCard)}
        </Stack>

        <div style={{ width: '100%', height: '1px', backgroundColor: 'gray', margin: '24px 0' }} />

        {/* Action Buttons */}
        <Group justify="center" gap="lg">
          <Button 
            variant="outline" 
            onClick={() => {
              setConsents(Object.keys(consents).reduce((acc, key) => ({
                ...acc,
                [key]: false
              }), {}))
            }}
            style={{
              backgroundColor: 'white',
              color: 'gray',
              border: '1px solid gray'
            }}
          >
            Decline All
          </Button>
          <Button
            onClick={() => {
              setConsents(Object.keys(consents).reduce((acc, key) => ({
                ...acc,
                [key]: true
              }), {}))
            }}
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: '2px solid black'
            }}
          >
            Help Improve AI
          </Button>
        </Group>

        <Text size="xs" c="gray.7" ta="center" mt="md">
          Your privacy choices are stored locally and can be changed anytime in settings.
          All AI training uses privacy-preserving techniques with mathematical guarantees.
        </Text>
      </Paper>

      {/* Technical Details Modal */}
      <Modal
        opened={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={selectedPurpose?.title}
        size="lg"
        styles={{
          header: { backgroundColor: 'white', borderBottom: '1px solid gray' },
          body: { backgroundColor: 'white' },
          title: { color: 'black', fontWeight: 600 }
        }}
      >
        {selectedPurpose && (
          <Stack gap="md">
            <Text c="black">{selectedPurpose.description}</Text>
            
            <Card 
              style={{ 
                border: '1px solid gray',
                borderRadius: 0,
                backgroundColor: 'white' 
              }}
            >
              <Text fw={600} mb="sm" c="black">Privacy Technologies Used:</Text>
              {selectedPurpose.pet_technologies.map(tech => (
                <div
                  key={tech}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#f8f9fa',
                    color: 'black',
                    padding: '2px 6px',
                    border: '1px solid gray',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginRight: '6px',
                    marginBottom: '6px'
                  }}
                >
                  {tech.replace('_', ' ')}
                </div>
              ))}
            </Card>

            <Card 
              style={{ 
                border: '1px solid gray',
                borderRadius: 0,
                backgroundColor: 'white' 
              }}
            >
              <Text fw={600} mb="sm" c="black">Data Handling:</Text>
              <Text size="sm" mb="xs" c="gray.7">• Retention: {selectedPurpose.retention}</Text>
              <Text size="sm" mb="xs" c="gray.7">• Processing: On-device when possible</Text>
              <Text size="sm" mb="xs" c="gray.7">• Sharing: Only aggregated, anonymized insights</Text>
              <Text size="sm" c="gray.7">• Deletion: Available on request</Text>
            </Card>

            {showTechnicalDetails && (
              <Card 
                style={{ 
                  border: '1px solid gray',
                  borderRadius: 0,
                  backgroundColor: 'white' 
                }}
              >
                <Text fw={600} mb="sm" c="black">Technical Implementation:</Text>
                <Code 
                  block
                  style={{
                    backgroundColor: '#f8f9fa',
                    color: 'black',
                    border: '1px solid gray',
                    borderRadius: 0
                  }}
                >
{`// Differential Privacy Example
epsilon = 0.1  // Strong privacy guarantee
noise = laplace_noise(sensitivity / epsilon)
private_result = true_result + noise

// Federated Learning
model_update = train_locally(user_data)
send_to_server(encrypted(model_update))
// Raw data never leaves device`}
                </Code>
              </Card>
            )}
          </Stack>
        )}
      </Modal>
    </>
  )
}

GamingPrivacyConsent.propTypes = {
  onConsentChange: PropTypes.func,
  showTechnicalDetails: PropTypes.bool,
  onPrivacyBudgetUpdate: PropTypes.func
}

GamingPrivacyConsent.displayName = 'GamingPrivacyConsent'

export default GamingPrivacyConsent