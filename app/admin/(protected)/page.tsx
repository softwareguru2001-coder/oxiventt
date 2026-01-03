import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </Link>
        <Link
          href="/admin/leads"
          className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Leads</h2>
          <p className="text-muted-foreground">View customer inquiries</p>
        </Link>
      </div>
    </div>
  );
}
