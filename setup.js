const fs = require('fs');
const path = require('path');

const dirs = [
  'app/(auth)/login',
  'app/(owner)/dashboard',
  'app/(owner)/branches/new',
  'app/(owner)/branches/[id]',
  'app/(owner)/employees/new',
  'app/(owner)/employees/[id]',
  'app/(owner)/inventory/restock',
  'app/(owner)/inventory/[id]',
  'app/(owner)/transactions/[id]',
  'app/(owner)/attendance',
  'app/(owner)/machine-reports/[id]',
  'app/(owner)/reports',
  'app/(staff)/dashboard',
  'app/(staff)/transactions/new',
  'app/(staff)/transactions/[id]',
  'app/(staff)/inventory',
  'app/(staff)/attendance',
  'app/(staff)/machine-reports/new',
  'app/api/storage/upload',
  'components/ui',
  'components/shared',
  'components/owner',
  'components/staff',
  'lib/supabase',
  'lib/actions',
  'lib/db/queries',
  'lib/utils',
  'types',
  'prisma/migrations',
  'docs'
];

const files = [
  { path: 'app/(auth)/login/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(auth)/layout.tsx', content: 'export default function Layout({ children }: { children: React.ReactNode }) {\n  return children;\n}\n' },
  
  { path: 'app/(owner)/layout.tsx', content: 'export default function Layout({ children }: { children: React.ReactNode }) {\n  return children;\n}\n' },
  { path: 'app/(owner)/dashboard/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/branches/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/branches/new/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/branches/[id]/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/employees/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/employees/new/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/employees/[id]/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/inventory/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/inventory/restock/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/inventory/[id]/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/transactions/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/transactions/[id]/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/attendance/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/machine-reports/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/machine-reports/[id]/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(owner)/reports/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },

  { path: 'app/(staff)/layout.tsx', content: 'export default function Layout({ children }: { children: React.ReactNode }) {\n  return children;\n}\n' },
  { path: 'app/(staff)/dashboard/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(staff)/transactions/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(staff)/transactions/new/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(staff)/transactions/[id]/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(staff)/inventory/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(staff)/attendance/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(staff)/machine-reports/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },
  { path: 'app/(staff)/machine-reports/new/page.tsx', content: 'export default function Page() {\n  return null;\n}\n' },

  { path: 'app/api/storage/upload/route.ts', content: 'export async function GET() {\n  return new Response(null, { status: 200 });\n}\n' },

  { path: 'lib/supabase/client.ts', content: '// Supabase client\n' },
  { path: 'lib/supabase/server.ts', content: '// Supabase server\n' },
  { path: 'lib/actions/auth.actions.ts', content: '// Auth actions\n' },
  { path: 'lib/actions/branch.actions.ts', content: '// Branch actions\n' },
  { path: 'lib/actions/employee.actions.ts', content: '// Employee actions\n' },
  { path: 'lib/actions/transaction.actions.ts', content: '// Transaction actions\n' },
  { path: 'lib/actions/inventory.actions.ts', content: '// Inventory actions\n' },
  { path: 'lib/actions/attendance.actions.ts', content: '// Attendance actions\n' },
  { path: 'lib/actions/machine-report.actions.ts', content: '// Machine report actions\n' },
  
  { path: 'lib/db/queries/transactions.ts', content: '// Transaction queries\n' },
  { path: 'lib/db/queries/inventory.ts', content: '// Inventory queries\n' },
  { path: 'lib/db/queries/reports.ts', content: '// Reports queries\n' },
  
  { path: 'lib/utils/rbac.ts', content: '// RBAC utils\n' },
  { path: 'lib/utils/format.ts', content: '// Format utils\n' },

  { path: 'types/database.types.ts', content: '// Database types\n' },
  { path: 'types/app.types.ts', content: '// App types\n' },

  { path: 'middleware.ts', content: 'import { NextResponse } from "next/server";\nexport function middleware() {\n  return NextResponse.next();\n}\n' },

  { path: 'prisma/schema.prisma', content: 'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n' }
];

dirs.forEach(d => {
  const fullPath = path.join(__dirname, d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

files.forEach(f => {
  const fullPath = path.join(__dirname, f.path);
  fs.writeFileSync(fullPath, f.content);
});

console.log("Setup complete");
