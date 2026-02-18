import Link from 'next/link';

const cards = [
  'Users & Verification',
  'Trips/Orders',
  'Pricing & Tiers',
  'Promos & Referrals',
  'Tombola Management',
  'Incidents',
  'Support Tickets',
  'City/Zone Config',
  'Content Banners',
];

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 36 }}>MOTOX Admin Dashboard</h1>
      <p>Electric blue + yellow control plane for operations.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        {cards.map((card) => (
          <section key={card} style={{ background: 'linear-gradient(135deg,#007BFF,#00E5FF)', borderRadius: 16, padding: 16, color: '#001' }}>
            <strong>{card}</strong>
          </section>
        ))}
      </div>
      <p style={{ marginTop: 18 }}><Link href="/dashboard">Open detailed dashboard</Link></p>
    </main>
  );
}
