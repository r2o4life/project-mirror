import CrowdsourceOptIn from '@/components/CrowdsourceOptIn';

export default function GitHubPage() {
  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <CrowdsourceOptIn 
        platformName="GitHub Core"
        description="The central nervous system for our open-source codebase. We will provision the official Project Mirror organization and core repositories once we have sufficient developer commitment to maintain the ecosystem."
        thresholdGoal={500}
        initialCommitments={482}
      />
    </div>
  );
}
