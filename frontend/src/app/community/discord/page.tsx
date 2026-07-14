import CrowdsourceOptIn from '@/components/CrowdsourceOptIn';

export default function DiscordPage() {
  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <CrowdsourceOptIn 
        platformName="Discord Terminal"
        description="The real-time operational headquarters. We will provision the official Project Mirror Discord server and configure role-based matchmaking channels once we achieve a critical mass of active communication nodes."
        thresholdGoal={1000}
        initialCommitments={845}
      />
    </div>
  );
}
