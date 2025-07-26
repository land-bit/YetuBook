import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lpzcyfyciioarvvrhfzy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwemN5ZnljaWlvYXJ2dnJoZnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjE3NzgsImV4cCI6MjA2ODQ5Nzc3OH0.-uSQBFN0_pDWgp_gU_4F_2E2TmO6pPoG1zVEMiXX_XE'

export const supabase = createClient(supabaseUrl, supabaseKey)
