import type { Metadata } from "next";
import { CreateAdminUserForm } from "@/components/admin/CreateAdminUserForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { createAdminAuthClient } from "@/lib/supabase/admin-auth";
import { deleteAdminUser } from "@/lib/actions/users";

export const metadata: Metadata = { title: "Users | LCM Admin" };
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const currentUser = session?.user;

  const adminAuth = createAdminAuthClient();
  const { data } = await adminAuth.auth.admin.listUsers();
  // This Supabase project also hosts an unrelated app — only show/manage users
  // created for LCM (tagged with app_metadata.role === "admin" at creation).
  const users = (data?.users ?? []).filter((u) => u.app_metadata?.role === "admin");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Admin Users</h1>
        <p className="text-sm text-charcoal/60">Manage who can sign in to this admin panel.</p>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>Email</TH>
            <TH>Created</TH>
            <TH>Last Sign In</TH>
            <TH>Actions</TH>
          </TR>
        </THead>
        <TBody>
          {users.map((u) => (
            <TR key={u.id}>
              <TD>
                {u.email}
                {u.id === currentUser?.id && <span className="ml-2 text-xs text-charcoal/40">(you)</span>}
              </TD>
              <TD>{new Date(u.created_at).toLocaleDateString("en-LK")}</TD>
              <TD>{u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString("en-LK") : "Never"}</TD>
              <TD>
                {u.id !== currentUser?.id && (
                  <DeleteButton action={deleteAdminUser.bind(null, u.id)} confirmMessage={`Remove admin access for ${u.email}?`} />
                )}
              </TD>
            </TR>
          ))}
          {users.length === 0 && (
            <TR><TD colSpan={4} className="py-8 text-center text-charcoal/50">No admin users found.</TD></TR>
          )}
        </TBody>
      </Table>

      <div className="max-w-md rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-base font-bold text-charcoal">Add Admin User</h2>
        <p className="mt-1 text-sm text-charcoal/60">Create a new account with access to this admin panel.</p>
        <div className="mt-4">
          <CreateAdminUserForm />
        </div>
      </div>
    </div>
  );
}
