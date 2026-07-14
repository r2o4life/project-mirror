import CrowdsourceOptIn from '@/components/CrowdsourceOptIn';

export default function BlogPage() {
  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <CrowdsourceOptIn 
        platformName="Open Source Blog"
        description="The architectural transmission log. We will launch the publication platform for long-form case studies, paradigm blueprints, and engineering post-mortems once we have enough committed authors and readers."
        thresholdGoal={250}
        initialCommitments={215}
      />
    </div>
  );
}
