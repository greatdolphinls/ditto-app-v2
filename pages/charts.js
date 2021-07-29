import Charts from 'containers/Charts'
import { StatsProvider } from 'contexts/stats-context'

export default function ChartsPage() {
  return (
    <StatsProvider>
      <Charts />
    </StatsProvider>
  )
}