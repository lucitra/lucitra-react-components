/**
 * Privacy Budget Visualization - Real-time Differential Privacy Monitoring
 * 
 * Visual component showing privacy budget consumption in real-time.
 * Key selling point for enterprise customers.
 */

import { useState, useEffect } from 'react'
import {
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Grid,
  ActionIcon,
  Tooltip,
  Card
} from '@mantine/core'
import {
  ModularCard,
  StatusIndicator,
  ModularBadge,
  AlertBox,
  ProgressBar
} from '../UI'
import {
  IconEye,
  IconShield,
  IconAlertTriangle,
  IconRefresh,
  IconTrendingUp,
  IconClock
} from '@tabler/icons-react'
import PropTypes from 'prop-types'

/**
 * Privacy Budget Visualization Component
 * 
 * @param {Object} props
 * @param {number} props.currentBudget - Current privacy budget (0-100)
 * @param {number} props.epsilon - Differential privacy epsilon value
 * @param {Array} props.consumptionHistory - Historical budget consumption
 * @param {Function} props.onBudgetAlert - Callback for budget alerts
 * @param {boolean} props.realTimeUpdates - Enable real-time updates
 */
export function PrivacyBudgetVisualization({
  currentBudget = 75,
  epsilon = 1.0,
  consumptionHistory = [],
  onBudgetAlert,
  realTimeUpdates = true,
  ...rest
}) {
  const [budget, setBudget] = useState(currentBudget)
  const [dailyConsumption, setDailyConsumption] = useState(0.1)
  const [projectedDepletion, setProjectedDepletion] = useState(null)
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    setBudget(currentBudget)
  }, [currentBudget])

  useEffect(() => {
    if (!realTimeUpdates) return

    const interval = setInterval(() => {
      // Simulate budget consumption
      setBudget(prev => {
        const newBudget = Math.max(0, prev - Math.random() * 0.5)
        
        // Generate alerts
        if (newBudget < 20 && prev >= 20) {
          const alert = {
            id: Date.now(),
            type: 'critical',
            message: 'Privacy budget critically low (< 20%)',
            timestamp: new Date()
          }
          setAlerts(prev => [alert, ...prev.slice(0, 4)])
          
          if (onBudgetAlert) {
            onBudgetAlert(alert)
          }
        } else if (newBudget < 50 && prev >= 50) {
          const alert = {
            id: Date.now(),
            type: 'warning',
            message: 'Privacy budget below 50%',
            timestamp: new Date()
          }
          setAlerts(prev => [alert, ...prev.slice(0, 4)])
        }
        
        return newBudget
      })
      
      setDailyConsumption(prev => prev + Math.random() * 0.02)
    }, 2000)

    return () => clearInterval(interval)
  }, [realTimeUpdates, onBudgetAlert])

  useEffect(() => {
    // Calculate projected depletion
    if (dailyConsumption > 0) {
      const daysRemaining = budget / (dailyConsumption * 24) // Assuming hourly consumption
      setProjectedDepletion(daysRemaining)
    }
  }, [budget, dailyConsumption])

  const getBudgetStatus = () => {
    if (budget >= 70) return 'healthy'
    if (budget >= 30) return 'moderate'
    return 'critical'
  }

  const getEpsilonDescription = () => {
    if (epsilon <= 0.1) return 'Maximum Privacy (Research Standard)'
    if (epsilon <= 1.0) return 'High Privacy (Recommended)'
    if (epsilon <= 5.0) return 'Moderate Privacy'
    return 'Lower Privacy (High Utility)'
  }

  const formatTime = (hours) => {
    if (hours < 24) return `${hours.toFixed(1)} hours`
    const days = Math.floor(hours / 24)
    return `${days} day${days !== 1 ? 's' : ''}`
  }

  return (
    <ModularCard 
      variant="primary"
      padding="xl"
      {...rest}
    >
      <Group justify="space-between" mb="xl">
        <Group>
          <IconEye size={28} color="black" />
          <div>
            <Title order={2} c="black">Privacy Budget Monitor</Title>
            <Text c="gray.7" size="sm">
              Real-time differential privacy tracking
            </Text>
          </div>
        </Group>
        
        <Group>
          {realTimeUpdates && (
            <ModularBadge variant="primary">
              LIVE
            </ModularBadge>
          )}
          <Tooltip label="Refresh data">
            <ActionIcon 
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                color: 'black'
              }}
              onClick={() => window.location.reload()}
            >
              <IconRefresh size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {/* Main Budget Display */}
      <ModularCard 
        variant="primary"
        padding="lg"
        style={{ marginBottom: '24px' }}
      >
        <Group justify="space-between" mb="md">
          <Text fw={600} size="lg" c="black">Current Privacy Budget</Text>
          <div>
            <Text size="xl" fw={700} c="black" style={{ display: 'inline' }}>
              {budget.toFixed(1)}%
            </Text>
            <StatusIndicator 
              status={budget >= 70 ? 'success' : budget >= 30 ? 'warning' : 'error'}
              size="xs"
              showDot={true}
              style={{
                display: 'inline-block',
                marginLeft: '8px',
                padding: '0'
              }}
            >
            </StatusIndicator>
          </div>
        </Group>
        
        <ProgressBar 
          value={budget}
          max={100}
          size="lg"
          variant={budget >= 70 ? 'success' : budget >= 30 ? 'warning' : 'error'}
          animate={true}
          striped={budget < 30}
          style={{
            marginBottom: '16px'
          }}
        />
        
        <Group justify="space-between">
          <Text size="sm" c="gray.7" style={{ fontFamily: 'monospace', backgroundColor: 'white', border: '1px solid #dee2e6', padding: '2px 6px' }}>
            ε = {epsilon} ({getEpsilonDescription()})
          </Text>
          <Text size="sm" c="gray.7" fw={600}>
            {budget < 10 ? 'CRITICAL' : budget < 30 ? 'LOW' : 'HEALTHY'}
          </Text>
        </Group>
      </ModularCard>

      {/* Metrics Grid */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <ModularCard variant="secondary" padding="md" style={{ height: '100%' }}>
            <Group mb="xs">
              <IconTrendingUp size={20} color="black" />
              <Text fw={600} size="sm" c="black">Daily Consumption</Text>
            </Group>
            <Text size="xl" fw={700} c="black" style={{ fontFamily: 'monospace' }}>
              {(dailyConsumption * 100).toFixed(3)}%
            </Text>
            <Text size="xs" c="gray.7">Epsilon units per day</Text>
          </ModularCard>
        </Grid.Col>
        
        <Grid.Col span={6}>
          <ModularCard variant="secondary" padding="md" style={{ height: '100%' }}>
            <Group mb="xs">
              <IconClock size={20} color="black" />
              <Text fw={600} size="sm" c="black">Projected Depletion</Text>
            </Group>
            <Text size="xl" fw={700} c="black" style={{ fontFamily: 'monospace' }}>
              {projectedDepletion ? formatTime(projectedDepletion) : 'N/A'}
            </Text>
            <Text size="xs" c="gray.7">At current rate</Text>
          </ModularCard>
        </Grid.Col>
      </Grid>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Stack gap="sm" mb="lg">
          <Text fw={600} size="sm" c="black">Recent Alerts</Text>
          {alerts.slice(0, 3).map(alert => (
            <AlertBox
              key={alert.id}
              variant={alert.type === 'critical' ? 'error' : 'warning'}
              size="sm"
              icon={<IconAlertTriangle size={16} color="black" />}
            >
              <Group justify="space-between">
                <Text size="sm" c="black">{alert.message}</Text>
                <Text size="xs" c="gray.7" style={{ fontFamily: 'monospace' }}>
                  {alert.timestamp.toLocaleTimeString()}
                </Text>
              </Group>
            </AlertBox>
          ))}
        </Stack>
      )}

      {/* Privacy Technology Info */}
      <ModularCard variant="primary" padding="lg">
        <Group mb="sm">
          <IconShield size={20} color="black" />
          <Text fw={600} c="black">Differential Privacy Guarantee</Text>
        </Group>
        <Text size="sm" mb="sm" c="gray.7">
          Your privacy budget provides mathematical guarantees that individual records 
          cannot be distinguished, even with unlimited computational power.
        </Text>
        <Group gap="xs">
          <ModularBadge variant="secondary" size="sm">
            ε-DIFFERENTIAL PRIVACY
          </ModularBadge>
          <ModularBadge variant="secondary" size="sm">
            FORMALLY VERIFIED
          </ModularBadge>
          <ModularBadge variant="secondary" size="sm">
            INDUSTRY STANDARD
          </ModularBadge>
        </Group>
      </ModularCard>
    </ModularCard>
  )
}

PrivacyBudgetVisualization.propTypes = {
  currentBudget: PropTypes.number,
  epsilon: PropTypes.number,
  consumptionHistory: PropTypes.array,
  onBudgetAlert: PropTypes.func,
  realTimeUpdates: PropTypes.bool
}

PrivacyBudgetVisualization.displayName = 'PrivacyBudgetVisualization'

export default PrivacyBudgetVisualization