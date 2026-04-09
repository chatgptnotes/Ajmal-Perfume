import { AlertTriangle, Package, UserX, Users } from 'lucide-react'
import type { Alert } from '../../../config/types'

interface AlertsPanelProps {
  alerts: readonly Alert[]
}

function getAlertIcon(type: string) {
  switch (type) {
    case 'warning':
      return <AlertTriangle size={16} />
    case 'stock':
      return <Package size={16} />
    case 'churn':
      return <UserX size={16} />
    case 'performance':
      return <Users size={16} />
    default:
      return <AlertTriangle size={16} />
  }
}

function getSeverityColor(severity: string): { bg: string; border: string; text: string } {
  switch (severity) {
    case 'high':
      return {
        bg: 'rgba(188, 139, 87, 0.10)',
        border: 'rgba(188, 139, 87, 0.35)',
        text: '#8B5E2F',
      }
    case 'medium':
      return {
        bg: 'rgba(188, 139, 87, 0.06)',
        border: 'rgba(188, 139, 87, 0.20)',
        text: '#9B7340',
      }
    default:
      return {
        bg: 'rgba(188, 139, 87, 0.04)',
        border: 'rgba(188, 139, 87, 0.12)',
        text: '#A68B60',
      }
  }
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <div style={{
      background: 'var(--beige-section)',
      borderRadius: 14,
      padding: 24,
      boxShadow: 'var(--shadow-soft)',
    }}>
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--gold-dark)',
        letterSpacing: '0.02em',
      }}>
        Alerts
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {alerts.map((alert, index) => {
          const colors = getSeverityColor(alert.severity)
          return (
            <div
              key={`${alert.type}-${index}`}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 10,
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                transition: 'all 0.2s var(--ease-luxury)',
              }}
            >
              <div style={{
                flexShrink: 0,
                width: 32,
                height: 32,
                borderRadius: 8,
                background: colors.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.text,
              }}>
                {getAlertIcon(alert.type)}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 3,
                }}>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: colors.text,
                  }}>
                    {alert.title}
                  </span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.06em',
                    color: alert.severity === 'high' ? '#8B5E2F' : '#9B7340',
                    background: alert.severity === 'high'
                      ? 'rgba(188, 139, 87, 0.18)'
                      : 'rgba(188, 139, 87, 0.10)',
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}>
                    {alert.severity}
                  </span>
                </div>
                <div style={{
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                }}>
                  {alert.message}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
