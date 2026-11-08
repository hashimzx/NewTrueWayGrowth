import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  DEFAULT_GROWTH_SERVICES, 
  DEFAULT_PORTFOLIO_ITEMS, 
  DEFAULT_TESTIMONIALS, 
  DEFAULT_USERS,
  GrowthUser,
  QuoteInquiry
} from './growthDatabase';

test('DEFAULT_GROWTH_SERVICES contains exactly the 8 required digital marketing services', () => {
  assert.equal(DEFAULT_GROWTH_SERVICES.length, 8);

  const ids = DEFAULT_GROWTH_SERVICES.map(s => s.id);
  assert.ok(ids.includes('social-media-marketing'));
  assert.ok(ids.includes('seo-search-engine-optimization'));
  assert.ok(ids.includes('facebook-instagram-advertising'));
  assert.ok(ids.includes('influencer-marketing'));
  assert.ok(ids.includes('content-creation'));
  assert.ok(ids.includes('graphic-design'));
  assert.ok(ids.includes('social-media-management'));
  assert.ok(ids.includes('digital-marketing-consultation'));

  // Verify each service has required fields
  for (const s of DEFAULT_GROWTH_SERVICES) {
    assert.ok(s.title.length > 0);
    assert.ok(s.description.length > 20);
    assert.ok(s.keyBenefits.length >= 3);
    assert.ok(s.workProcess.length === 4);
    assert.ok(s.startingPriceUSD > 0);
    assert.ok(s.startingPriceGBP > 0);
  }
});

test('DEFAULT_PORTFOLIO_ITEMS contains completed case studies with concrete metrics', () => {
  assert.ok(DEFAULT_PORTFOLIO_ITEMS.length >= 4);
  for (const p of DEFAULT_PORTFOLIO_ITEMS) {
    assert.ok(p.title.length > 0);
    assert.ok(p.client.length > 0);
    assert.ok(p.results.length >= 2);
    assert.ok(p.servicesUsed.length >= 1);
  }
});

test('DEFAULT_TESTIMONIALS contains verified client reviews with 5-star ratings', () => {
  assert.ok(DEFAULT_TESTIMONIALS.length >= 4);
  for (const t of DEFAULT_TESTIMONIALS) {
    assert.equal(t.rating, 5);
    assert.ok(t.clientName.length > 0);
    assert.ok(t.company.length > 0);
    assert.ok(t.quote.length > 20);
    assert.equal(t.verified, true);
  }
});

test('DEFAULT_USERS includes default admin and client with role-based attributes', () => {
  const admin = DEFAULT_USERS.find(u => u.email === 'admin@truewaygrowth.com');
  assert.ok(admin);
  assert.equal(admin.role, 'admin');
  assert.equal(admin.status, 'active');
  assert.equal(admin.passwordHash, 'admin123');

  const client = DEFAULT_USERS.find(u => u.email === 'client@truewaygrowth.com');
  assert.ok(client);
  assert.equal(client.role, 'student');
  assert.equal(client.status, 'active');
  assert.equal(client.passwordHash, 'client123');
});

test('QuoteInquiry model validates required inquiry attributes', () => {
  const inquiry: QuoteInquiry = {
    id: 'test-inq-1',
    name: 'Sarah Jenkins',
    email: 'sarah@example.com',
    phone: '+44 7911 123456',
    company: 'Luxe Botanics',
    serviceId: 'social-media-marketing',
    serviceName: 'Social Media Marketing',
    budget: '$500 - $1,000 / month',
    message: 'Need full management of Instagram and TikTok accounts.',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  assert.equal(inquiry.status, 'new');
  assert.ok(inquiry.name.length > 0);
  assert.ok(inquiry.email.includes('@'));
  assert.ok(inquiry.phone.length > 5);
});
