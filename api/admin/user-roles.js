import { createClient } from '@supabase/supabase-js';
import { handleOptions, applyCors } from '../_lib/cors.js';
import { requireAdmin } from '../_lib/auth.js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

const clean = (value) => String(value || '').trim();

const logRoleChange = async ({ action, targetUserId, role, adminUser, note }) => {
  if (!supabase) return;
  await supabase.from('role_change_audit').insert({
    action,
    target_user_id: targetUserId,
    role,
    changed_by: adminUser?.id || null,
    changed_by_email: adminUser?.email || null,
    note: note || null,
  });
};

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase not configured' });
    }

    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return;

    if (req.method === 'GET') {
      const [rolesRes, profilesRes, auditRes] = await Promise.all([
        supabase.from('user_roles').select('id,user_id,role,created_at').order('created_at', { ascending: false }),
        supabase.from('profiles').select('id,full_name,phone,created_at').order('created_at', { ascending: false }).limit(1000),
        supabase.from('role_change_audit').select('id,action,target_user_id,role,changed_by_email,note,created_at').order('created_at', { ascending: false }).limit(200),
      ]);

      if (rolesRes.error) return res.status(500).json({ error: rolesRes.error.message });
      if (profilesRes.error) return res.status(500).json({ error: profilesRes.error.message });
      if (auditRes.error) return res.status(500).json({ error: auditRes.error.message });

      return res.status(200).json({
        roles: rolesRes.data || [],
        profiles: profilesRes.data || [],
        audit: auditRes.data || [],
      });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const action = clean(body.action);
      const userId = clean(body.user_id);
      const role = clean(body.role);
      const note = clean(body.note);

      if (!userId || !role || !['admin', 'user'].includes(role)) {
        return res.status(400).json({ error: 'Invalid user_id or role' });
      }

      if (action === 'add') {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role });

        if (error) return res.status(500).json({ error: error.message });

        await logRoleChange({
          action: 'add',
          targetUserId: userId,
          role,
          adminUser,
          note,
        });

        return res.status(200).json({ success: true });
      }

      if (action === 'remove') {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', role);

        if (error) return res.status(500).json({ error: error.message });

        await logRoleChange({
          action: 'remove',
          targetUserId: userId,
          role,
          adminUser,
          note,
        });

        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ error: 'Invalid action' });
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('api/admin/user-roles error', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}
