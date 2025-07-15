/**
 * Privacy Budget Visualization - REFACTORED with Design System
 * 
 * Demonstrates usage of reusable UI components instead of inline styles
 * Shows the before/after of clean design system implementation
 */

import { useState, useEffect } from 'react'
import {
  Title,
  Text,
  Group,
  Stack,
  Grid,
  Tooltip
} from '@mantine/core'
import {
  IconEye,
  IconShield,
  IconAlertTriangle,
  IconRefresh,
  IconTrendingUp,
  IconClock
} from '@tabler/icons-react'
import PropTypes from 'prop-types'

// Import our new design system components
import {
  ModularCard,
  StatusIndicator,
  ModularButton,
  ModularBadge,
  CodeBlock,
  AlertBox,
  ProgressBar
} from '../UI'

export function PrivacyBudgetVisualizationRefactored({
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
      setBudget(prev => {
        const newBudget = Math.max(0, prev - Math.random() * 0.5)
        
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
    if (dailyConsumption > 0) {
      const daysRemaining = budget / (dailyConsumption * 24)
      setProjectedDepletion(daysRemaining)
    }
  }, [budget, dailyConsumption])

  const getBudgetStatus = () => {
    if (budget >= 70) return 'success'
    if (budget >= 30) return 'warning'
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

  const getProgressVariant = () => {
    if (budget >= 70) return 'success'
    if (budget >= 30) return 'warning'
    return 'error'
  }

  return (
    <ModularCard variant="primary" padding="xl" {...rest}>
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
            <StatusIndicator status="success" size="sm">
              LIVE
            </StatusIndicator>
          )}
          <Tooltip label="Refresh data">
            <ModularButton
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              leftIcon={<IconRefresh size={16} />}
            >
              Refresh
            </ModularButton>
          </Tooltip>
        </Group>
      </Group>

      {/* Main Budget Display */}
      <ModularCard variant="accent" mb="lg">
        <Group justify="space-between" mb="md">
          <Text fw={600} size="lg" c="black">Current Privacy Budget</Text>
          <Group gap="sm">
            <Text size="xl" fw={700} c="black">
              {budget.toFixed(1)}%
            </Text>
            <StatusIndicator 
              status={getBudgetStatus()} 
              showDot={true}
              size="sm"
            >
              {budget < 10 ? 'CRITICAL' : budget < 30 ? 'LOW' : 'HEALTHY'}
            </StatusIndicator>
          </Group>
        </Group>
        
        <ProgressBar 
          value={budget} 
          variant={getProgressVariant()}
          size="lg"
          showLabel
          striped={budget < 30}
          animate={budget < 30}
          style={{ marginBottom: '16px' }}
        />
        
        <Group justify="space-between">
          <CodeBlock variant="metric">
            ε = {epsilon} ({getEpsilonDescription()})
          </CodeBlock>
          <ModularBadge variant="status">
            {budget < 10 ? 'CRITICAL' : budget < 30 ? 'LOW' : 'HEALTHY'}
          </ModularBadge>
        </Group>
      </ModularCard>

      {/* Metrics Grid */}
      <Grid mb="lg">
        <Grid.Col span={6}>
          <ModularCard variant="secondary" style={{ height: '100%' }}>
            <Group mb="xs">
              <IconTrendingUp size={20} color="black" />
              <Text fw={600} size="sm" c="black">Daily Consumption</Text>
            </Group>
            <CodeBlock variant="metric" style={{ fontSize: '20px', fontWeight: 700 }}>
              {(dailyConsumption * 100).toFixed(3)}%
            </CodeBlock>
            <Text size="xs" c="gray.7">Epsilon units per day</Text>
          </ModularCard>
        </Grid.Col>
        
        <Grid.Col span={6}>
          <ModularCard variant="secondary" style={{ height: '100%' }}>
            <Group mb="xs">
              <IconClock size={20} color="black" />
              <Text fw={600} size="sm" c="black">Projected Depletion</Text>
            </Group>
            <CodeBlock variant="metric" style={{ fontSize: '20px', fontWeight: 700 }}>
              {projectedDepletion ? formatTime(projectedDepletion) : 'N/A'}
            </CodeBlock>
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
              icon={<IconAlertTriangle size={16} />}
            >
              <Group justify="space-between">
                <Text size="sm">{alert.message}</Text>
                <CodeBlock variant="inline">
                  {alert.timestamp.toLocaleTimeString()}
                </CodeBlock>
              </Group>
            </AlertBox>
          ))}
        </Stack>
      )}

      {/* Privacy Technology Info */}
      <ModularCard variant="status">
        <Group mb="sm">
          <IconShield size={20} color="black" />
          <Text fw={600} c="black">Differential Privacy Guarantee</Text>
        </Group>
        <Text size="sm" mb="sm" c="gray.7">
          Your privacy budget provides mathematical guarantees that individual records 
          cannot be distinguished, even with unlimited computational power.
        </Text>
        <Group gap="xs">
          <ModularBadge variant="code">ε-differential privacy</ModularBadge>
          <ModularBadge variant="primary">Formally verified</ModularBadge>
          <ModularBadge variant="secondary">Industry standard</ModularBadge>
        </Group>
      </ModularCard>
    </ModularCard>
  )
}

PrivacyBudgetVisualizationRefactored.propTypes = {
  currentBudget: PropTypes.number,
  epsilon: PropTypes.number,
  consumptionHistory: PropTypes.array,
  onBudgetAlert: PropTypes.func,
  realTimeUpdates: PropTypes.bool
}

PrivacyBudgetVisualizationRefactored.displayName = 'PrivacyBudgetVisualizationRefactored'

export default PrivacyBudgetVisualizationRefactored