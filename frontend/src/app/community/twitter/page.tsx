import CrowdsourceOptIn from '@/components/CrowdsourceOptIn';

export default function TwitterPage() {
  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <CrowdsourceOptIn 
        platformName="X / Twitter"
        description="The public broadcast protocol. We will activate the official social broadcast channel to announce new competitive benchmarks and matchmaking opportunities once enough engineers demand public syndication."
        thresholdGoal={2000}
        initialCommitments={1402}
      />
    </div>
  );
}
